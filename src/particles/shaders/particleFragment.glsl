// uPosition1 is prev positions, uPosition2 is current

/*
vPosition.w is state, which encodes (stateI,stateF), where stateI is int
and stateF is lower precision float. stateI is -1 if particle is attached to home position,
and >=0 when the particle is attached to objects[stateI].

NOTE! Didnt work on mobile (low precision?) so dropped stateF.
*/

/*
Steering forces:
1) enforce |steering|=maxSpeed
2) steering = steering-velocity
3) enforce |steering|<=maxForce

acceleration = sum(steering forces)
*/

#define NUM_OBJECTS 5       // NOTE! This has to be same as in config.ts

uniform vec3 uPositionObjects[NUM_OBJECTS];
uniform sampler2D uPosition0;
uniform sampler2D uPosition1;
uniform sampler2D uPosition2;
varying vec2 vUv;
varying vec3 vPosition; // same as uPosition2, clean up at some point

#define PI 3.14159265359

vec2 random22(vec2 p) {
    // Source: The Book of Shaders
    return fract(sin(vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5, 183.3))))*43758.5453);
}

float random21(vec2 p) {
    // Source: The Book of Shaders
    return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453123);
}

float encodeIntAndFloat(int i, float f) {
    float f_bounded = (0.5 + atan(f)/PI);  
    return float(i) + f_bounded;
}

void decodeIntAndFloat(float encoded, out int i, out float f) {
    i = int(floor(encoded));
    float f_bounded = fract(encoded);
    f = tan(PI*(f_bounded - 0.5));  
}

// float encodeIntAndFloat(int i, float f) {
//     return (float(i)+1.0)/10.0;
// }

// void decodeIntAndFloat(float encoded, out int i, out float f) {
//     i = int(round(10.0*encoded-1.0));
//     f = 0.0;
// }

vec3 safeNormalize(vec3 v) {
    float d = length(v);
    if (d > 0.0)
        return v / d;
    else 
        return vec3(0., 0., 1.);
}

float computeState(vec3 p0, vec3 p1, vec3 p2, float state) {
    int stateI;
    float stateF;
    decodeIntAndFloat(state, stateI, stateF);

    vec2 rand = random22(vUv + vec2(stateI, stateF));

    // if (stateI == -1)
    //     stateF = max(0.0, stateF-0.002);
    // if (stateI >= 0)
    //     stateF = min(1.0, stateF+0.005);

    int newStateI = stateI;

    vec3 v02 = p2-p0;
    float d0 = length(v02); // distance home

    if (stateI == -1) {
        for (int k = 0; k < NUM_OBJECTS; k++) {
            vec3 vp = p2-uPositionObjects[k];
            float d1 = length(vp);  // distance to object

            // Get attached to the object if we are home and object is close
            if ((d0 < 0.01) && (d1 < 0.25+0.5*rand.x*rand.x)) {
                newStateI = k;
            }
        }
        return encodeIntAndFloat(newStateI, stateF);
    }

    // Now stateI >= 0:

    vec3 vp = p2-uPositionObjects[stateI];
    float d1 = length(vp);  // distance to object

    // Return home if distance home is too long
    if (d0 > 1.0+0.5*rand.y) {
        newStateI = -1;
    }
    return encodeIntAndFloat(newStateI, stateF);
}

vec3 computeSteering(vec3 vSteer, vec3 v, float maxSpeed, float maxForce) {
    vec3 steering = maxSpeed*safeNormalize(vSteer);
    steering = steering-v;
    float len = length(steering);
    if (len > 0.0) 
        steering = steering*min(maxForce/len, 1.0);
    return steering;
}

vec3 computeForce(vec3 p0, vec3 p1, vec3 p2, float state) {
    int stateI;
    float stateF;
    decodeIntAndFloat(state, stateI, stateF);

    vec3 v02 = p2-p0;
    vec3 v = p2-p1;

    float maxForce = 5.;
    float maxSpeedHome = min(0.02, 0.1*length(v02));
    float maxSpeedOrbit = 0.1;
    float maxForceOrbit = 5.;

    vec3 steeringHome = computeSteering(-v02, v, maxSpeedHome, maxForce);
    vec3 steeringSpeedHome = computeSteering(v*(0.2-length(v)), v, maxSpeedHome, maxForce);

    if (stateI == -1)
        return steeringHome + steeringSpeedHome;

    vec3 vp = p2-uPositionObjects[stateI];
    vec3 steeringOrbit = computeSteering(vp*(0.2-length(vp)), v, maxSpeedOrbit, maxForceOrbit);
    vec3 steeringSpeedOrbit = computeSteering(v*(0.1-length(v)), v, maxSpeedOrbit, maxForceOrbit);

    return steeringOrbit + steeringSpeedOrbit;
}

void main() {
    vec4 p = texture2D(uPosition2, vUv);
    vec3 p0 = texture2D(uPosition0, vUv).xyz;
    vec3 p1 = texture2D(uPosition1, vUv).xyz;
    vec3 p2 = p.xyz;

    float state = computeState(p0, p1, p2, p.w);
    vec3 F = 0.01*computeForce(p0, p1, p2, state);

    // Verlet integration
    vec3 newPos = p2 + 0.9*(p2-p1) + F;

    gl_FragColor = vec4(newPos, state);
}
