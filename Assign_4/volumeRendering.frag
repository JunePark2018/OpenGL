#version 140
#extension GL_ARB_compatibility: enable

in vec3 pixelPosition;
uniform vec3 eyePosition;
uniform vec3 objectMin;
uniform vec3 objectMax;
uniform vec3 up;
uniform sampler3D tex;
uniform sampler1D transferFunction;

uniform int mode;

bool intersectBox(vec3 rayStart, vec3 rayDir, vec3 boxMin, vec3 boxMax, out float tMin, out float tMax) {
    vec3 invDir = 1.0 / rayDir;
    vec3 t0s = (boxMin - rayStart) * invDir;
    vec3 t1s = (boxMax - rayStart) * invDir;

    vec3 tSmaller = min(t0s, t1s);
    vec3 tLarger = max(t0s, t1s);

    tMin = max(max(tSmaller.x, tSmaller.y), tSmaller.z);
    tMax = min(min(tLarger.x, tLarger.y), tLarger.z);

    return tMax >= max(0.0, tMin);
}

vec3 normalizePos(vec3 Pos) {
    return (Pos / (objectMax - objectMin)) + vec3(0.5, 0.5, 0.5);
}

void main()
{
	vec4 composedColor=vec4(0,0,0,0);

	// .. ToDo
        
    vec3 rayDir = normalize(pixelPosition - eyePosition);
    vec3 rayStart = pixelPosition;

    // Bounding Box와의 교차 계산
    float tMin, tMax;
    if (!intersectBox(rayStart, rayDir, objectMin, objectMax, tMin, tMax)) {
        discard;
    }
    
    // 광선의 시작점과 끝점
    vec3 entryPoint = rayStart + tMin * rayDir;
    vec3 exitPoint = rayStart + tMax * rayDir;
        
    vec3 currentPos = entryPoint;
    float dt = 1; // 샘플링 간격

    switch (mode) {

    default:
    case 1: // Maximum Intensity Projection
        
        float val = 0.0;
    
        // 광선을 따라 샘플링
        for (float t = tMin; t < tMax; t += dt) {
            float density = texture(tex, normalizePos(currentPos)).r; // 텍스처 샘플링
            if (density > val)
            {
                val = density;
            }
            // 광선 진행
            currentPos += rayDir * dt;
        }

        gl_FragColor = vec4(val, val, val, 1); // 최종 색상 출력
        break;

    case 2: // Isosurface Rendering

        float isovalue = 0.5;
        for (float t = tMin; t < tMax; t += dt) {
            float density = texture(tex, normalizePos(currentPos)).r; // 텍스처 샘플링
            if (density >= isovalue)
            {
                // 주변 density 확인
                vec3 gradient;

                gradient.x = (texture(tex, normalizePos(currentPos - vec3(1, 0, 0))).r - texture(tex, normalizePos(currentPos + vec3(1, 0, 0))).r) / 2;
                gradient.y = (texture(tex, normalizePos(currentPos - vec3(0, 1, 0))).r - texture(tex, normalizePos(currentPos + vec3(0, 1, 0))).r) / 2;
                gradient.z = (texture(tex, normalizePos(currentPos - vec3(0, 0, 1))).r - texture(tex, normalizePos(currentPos + vec3(0, 0, 1))).r) / 2;

                vec3 lightColor = vec3(1, 1, 1);

                // Ambient
                vec3 ambient = 0.1 * lightColor;

                // Diffuse
                vec3 lightDir = normalize(eyePosition - pixelPosition);
                vec3 diffuse = max(dot(gradient, lightDir), 0.0) * lightColor;

                // Specular
                vec3 viewDir = normalize(eyePosition - pixelPosition);
                vec3 reflectDir = reflect(-lightDir, gradient);
                vec3 specular = pow(max(dot(viewDir, reflectDir), 0.0), 32) * lightColor;

                // Final color
                vec3 result = (ambient + diffuse + specular) * 5;
                
                gl_FragColor = vec4(result, 1); // 최종 색상 출력
                break;
            }
            else
            {
                // 광선 진행
                currentPos += rayDir * dt;
            }
        }

        break;
        
    case 3: // Alpha Compositing

        dt = 0.2;

        // 광선을 따라 샘플링
        for (float t = tMin; t < tMax; t += dt) {
            float density = texture(tex, normalizePos(currentPos)).r; // 텍스처 샘플링
            vec4 color = texture(transferFunction, density);
            float correctedAlpha = pow(color.a, 3);

            composedColor.rgb += (1 - composedColor.a) * color.rgb * correctedAlpha;
            composedColor.a += (1 - composedColor.a) * correctedAlpha;

            if (composedColor.a >= 1) break;

            // 광선 진행
            currentPos += rayDir * dt;
        }

        gl_FragColor = composedColor;

        break;
    }
}