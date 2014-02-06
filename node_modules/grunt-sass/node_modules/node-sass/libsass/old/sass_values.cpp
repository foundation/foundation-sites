#include "stdlib.h"
#include "string.h"
#include "sass_values.h"

extern "C" {

	union Sass_Value make_sass_boolean(int val) {
		return new_sass_c_boolean(val);
	}
	union Sass_Value make_sass_number(double val) {
		return new_sass_c_number(val);
	}
	union Sass_Value make_sass_percentage(double val) {
		return new_sass_c_percentage(val);
	}
	union Sass_Value make_sass_dimension(double val, const char* unit) {
		return new_sass_c_dimension(val, unit);
	}
	union Sass_Value make_sass_color(double r, double g, double b, double a) {
		return new_sass_c_color(r, g, b, a);
	}
	union Sass_Value make_sass_string(const char* val) {
		return new_sass_c_string(val);
	}
	union Sass_Value make_sass_list(size_t len, enum Sass_Separator sep) {
		return new_sass_c_list(len, sep);
	}
	union Sass_Value make_sass_error(const char* msg) {
		return new_sass_c_error(msg);
	}

}

union Sass_Value new_sass_c_boolean(int val)
{
	union Sass_Value v;
	v.boolean.tag = SASS_BOOLEAN;
	v.boolean.value = val;
	return v;
}

union Sass_Value new_sass_c_number(double val)
{
	union Sass_Value v;
	v.number.tag = SASS_NUMBER;
	v.number.value = val;
	return v;
}

union Sass_Value new_sass_c_percentage(double val)
{
	union Sass_Value v;
	v.percentage.tag = SASS_PERCENTAGE;
	v.percentage.value = val;
	return v;
}

union Sass_Value new_sass_c_dimension(double val, const char* unit)
{
	union Sass_Value v;
	v.dimension.tag = SASS_DIMENSION;
	v.dimension.value = val;
	v.dimension.unit = strdup(unit);
	return v;
}

union Sass_Value new_sass_c_color(double r, double g, double b, double a)
{
	union Sass_Value v;
	v.color.tag = SASS_COLOR;
	v.color.r = r;
	v.color.g = g;
	v.color.b = b;
	v.color.a = a;
	return v;
}

union Sass_Value new_sass_c_string(const char* val)
{
	union Sass_Value v;
	v.string.tag = SASS_STRING;
	v.string.value = strdup(val);
	return v;
}

union Sass_Value new_sass_c_list(size_t len, enum Sass_Separator sep)
{
	union Sass_Value v;
	v.list.tag = SASS_LIST;
	v.list.separator = sep;
	v.list.values = (union Sass_Value*) malloc(sizeof(union Sass_Value)*len);
	v.list.length = len;
	return v;
}

union Sass_Value new_sass_c_error(const char* msg)
{
	union Sass_Value v;
	v.error.tag = SASS_ERROR;
	v.error.message = strdup(msg);
	return v;
}


void free_sass_value(union Sass_Value v)
{
	switch (v.unknown.tag)
	{
		case SASS_STRING: {
		  free(v.string.value);
		  v.string.value = NULL;
		} break;
		case SASS_LIST: {
			size_t i;
			for (i = 0; i < v.list.length; ++i) free_sass_value(v.list.values[i]);
			free(v.list.values);
			v.list.values = NULL;
			v.list.length = 0;
		} break;
		case SASS_ERROR: {
			free(v.error.message);
			v.error.message = NULL;
		} break;

		default: break;
	}
}