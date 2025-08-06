#version 140
#extension GL_ARB_compatibility: enable

in vec3 fPos;
in vec3 normal;
in vec4 color;

out vec4 fColor;

uniform vec3 viewPos;          // camera position
uniform int numShades;         // number of range (2 ~ 9)

void main()
{
    vec3 lightPos = vec3(0.0f, 2.0f, 2.0f);  
    
    // Use diffuse term from the Phong model
    vec3 norm = normalize(normal);                     // Get normalized surface normal
    vec3 lightDir = normalize(lightPos - fPos);        // Get light direction
    float diff = max(dot(lightDir, norm), 0.0);        // Get l dot n

    // Assign constants
    int stage = 0;
    for (; diff > float(stage + 1) / numShades; stage++);
    float intensity = stage / float(numShades - 1);

    // Get color
    fColor = vec4(intensity * vec3(color.x, color.y, color.z), 1.0);
}

