#version 140
#extension GL_ARB_compatibility: enable

in vec3 aPos;
in vec2 aTexCoord;
in vec3 aNormal;

out vec2 texCoord;
out vec3 normal;
out vec3 fPos;

uniform mat4 ModelMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ProjectionMatrix;

void main() 
{
	texCoord = aTexCoord;
	fPos = vec3(ModelMatrix * vec4(aPos, 1.0));
	normal = mat3(transpose(inverse(ModelMatrix))) * aNormal;

	gl_Position = ProjectionMatrix * ViewMatrix * vec4(fPos, 1.0);
}

