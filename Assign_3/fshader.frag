#version 140
#extension GL_ARB_compatibility: enable

in vec2 texCoord;
in vec3 normal;
in vec3 fPos;

out vec4 fColor;

uniform int drawMode;

uniform sampler2D tex;

uniform vec3 viewPos;
uniform sampler2D reflectionMaps[6];

void main() 
{
    if (drawMode == 0) {
        fColor = texture(tex, texCoord);
    }
    else if (drawMode == 1) {

        vec3 I = normalize(fPos - viewPos);
        vec3 R = reflect(I, normalize(normal));

        vec3 reflectionColor;
        if (abs(R.x) > abs(R.y) && abs(R.x) > abs(R.z)) {
            // X 축이 가장 크면 +X 또는 -X 텍스처 사용
            if (R.x > 0.0) {
                reflectionColor = texture(reflectionMaps[0], vec2(-R.y, R.z) * 0.5 + 0.5).rgb; // +X 텍스처
            } else {
                reflectionColor = texture(reflectionMaps[1], vec2(R.y, R.z) * 0.5 + 0.5).rgb; // -X 텍스처
            }
        } else if (abs(R.y) > abs(R.x) && abs(R.y) > abs(R.z)) {
            // Y 축이 가장 크면 +Y 또는 -Y 텍스처 사용
            if (R.y > 0.0) {
                reflectionColor = texture(reflectionMaps[2], vec2(R.x, R.z) * 0.5 + 0.5).rgb; // +Y 텍스처
            } else {
                reflectionColor = texture(reflectionMaps[3], vec2(R.x, -R.z) * 0.5 + 0.5).rgb; // -Y 텍스처
            }
        } else {
            // Z 축이 가장 크면 +Z 또는 -Z 텍스처 사용
            if (R.z > 0.0) {
                reflectionColor = texture(reflectionMaps[4], vec2(R.x, -R.y) * 0.5 + 0.5).rgb; // +Z 텍스처
            } else {
                reflectionColor = texture(reflectionMaps[5], vec2(-R.x, -R.y) * 0.5 + 0.5).rgb; // -Z 텍스처
            }
        }

        fColor = vec4(reflectionColor, 1.0);
        
        // fColor = vec4(1.0, 0.0, 0.0, 1.0); // 빨간색
    }
} 
