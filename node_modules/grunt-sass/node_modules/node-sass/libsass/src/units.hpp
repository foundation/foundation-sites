#include <string>

namespace Sass {
  using namespace std;

	enum Unit { IN, CM, PC, MM, PT, PX, INCOMMENSURABLE };
	extern double conversion_factors[6][6];
  Unit string_to_unit(const string&);
  double conversion_factor(const string&, const string&);
  double convert(double, const string&, const string&);
}