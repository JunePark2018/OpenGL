#version 140
#extension GL_ARB_compatibility: enable

in vec3 fPos;
in vec3 normal;
in vec4 color;

out vec4 fColor;

const int numLights = 3;

uniform vec3 viewPos; // Camera Position

uniform float k_a[numLights]; // Ambient
uniform float k_d[numLights]; // Diffuse
uniform float k_s[numLights]; // Specular
uniform float alpha[numLights]; // Alpha

const vec3 lightPositions[numLights] = vec3[](
    vec3(-2.0f, 0.0f, 0.0f),
    vec3(0.0f, 2.0f, 0.0f),
    vec3(0.0f, 0.0f, 2.0f)
);

const vec3 lightColors[numLights] = vec3[](
    vec3(0.8f, 0.3f, 0.3f),
    vec3(0.3f, 0.8f, 0.3f),
    vec3(0.3f, 0.3f, 0.8f) 
);

void main()
{
    vec3 result = vec3(0.0, 0.0, 0.0); // Initialize Color
    vec3 viewDir = normalize(viewPos - fPos);  // Camera Direction

    // Calcualte Ambient, Diffuse, Specular per light
    for (int i = 0; i < numLights; ++i) {
        // Ambient
        vec3 ambient = k_a[i] * lightColors[i];

        // Diffuse
        vec3 lightDir = normalize(lightPositions[i] - fPos);        // Get l
        float diff = max(dot(lightDir, normal), 0.0);               // Get l dot n
        vec3 diffuse = k_d[i] * diff * lightColors[i];

        // Specular
        vec3 reflectDir = 2 * dot(normalize(lightDir), normal) * normal - lightDir;     // Get r
        float spec = pow(max(dot(reflectDir, viewDir), 0.0), alpha[i]);                 // Get (r dot v)^alpha
        vec3 specular = k_s[i] * spec * lightColors[i];

        // Get the result
        result += (ambient + diffuse + specular);
    }

    // Get the color
    result *= vec3(color.x, color.y, color.z);
    fColor = vec4(result, 1.0);
}