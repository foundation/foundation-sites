#!/usr/bin/env ruby

#This script requires a standard directory hierarchy which might be a bit cumbersome to set up
#
#The hierarchy looks like this near the leaves:
#...
#|-test_subclass_1
#| |-test_1
#| | |-input.scss
#| | --expected_output.css
#| --test_2
#|   |-input.scss
#|   --expected_output.css
#|-test_subclass_2
#| |-test_1
#| | |-input.scss
#| | --expected_output.css
#...
#the point is to have all the tests in their own folder in a file named input* with
#the output of running a command on it in the file expected_output* in the same directory

#begin help section
def description()
	"\nThis script will search for all files under the current (or specified) directory that are\n"+
	"named input.scss. It will then run a specified binary and check that the output matches the\n"+
	"expected output. If you want set up your own test suite, follow a similar hierarchy as described in\n"+
	"the initial comment of this script for your test hierarchy. (This script is intended for testing\n"+
	"sass implementations, but can be easily modified to test anything.)\n\n"
end

def getusage()
	"Usage: testrunner.rb [Options]\n"+
	"\n"+
	"Options:\n"+
	"\t-c=, --command=\tSets a specific binary to run (defaults to 'sass')\n"+
	"\t-d=, --dir=\tSets the directory to recursively search for tests (defaults to '.')\n"+
	"\t-f, --fails\tDon't print out information about passing tests to make the output easier to wade through"+
	"\t-h, --help\t\tDisplay this message\n"+
	"\t--nolog\t\tDon't display the log of diffs after all the tests are run\n"+
	"\t-v, --verbose\tDisplay more info\n\n"
end

def exampleusage()
	"Example usage:\n"+
	"./testrunner.rb -c='sassc'\n"+
	"./testrunner.rb -d=mytestsuite -v\n\n"
end

#print an error message and the usage message, exit with a certain return code
def usage(s,c)
	$stderr.puts(s + getusage())
	exit(c)
end
#end help section

#begin option parsing/sanitizing section
opts = {}

opts[:cmd] = 'sass' #set to the default command
opts[:srchpath] = '.' #set to the default path
opts[:verbose] = false #don't be too talkative by default
opts[:skip] = false #if a command doesn't exit nicely, stop testing
opts[:fails] = false
opts[:nolog] = false

loop { case ARGV[0] #this argument parsing allows garbage at the end that doesn't start with '-', modify if necessary
	when /^-(c|-command)=/ then    #to change what to run, modify these lines (or copy them)
		opts[:cmd] = ARGV.shift.split("=",2)[1] #get the specified binary
		if (opts[:cmd] == "") #catch empty command
			usage("\nERROR: Must specify a command after -c= or --command=\n\n", 1)
		end
	when /^-(d|-dir)=/ then
		opts[:srchpath] = ARGV.shift.split("=",2)[1] #get the dir
		if (opts[:srchpath] == "") #catch empty dir (no dir was input)
			usage("\nERROR: Must specify a directory to search after -d= or --dir=\n\n", 1)
		end
	when /^-(f|-fails)$/ then
		opts[:fails] = true
		ARGV.shift
	when /^-(h|-help)$/ then
		puts description() + getusage() + exampleusage()
		exit(0)
	when /^--nolog$/ then
		opts[:nolog] = true
		ARGV.shift
	when /^-(s|-skip)$/ then
		opts[:skip] = true
		ARGV.shift
	when /^-(v|-verbose)$/ then
		opts[:verbose] = true
		ARGV.shift
	when /^-/ then #found an unhandled option, print an error and exit out
		usage("\nERROR: Unknown option: #{ARGV[0].inspect} (make sure to include the '=' for options that require it)\n\n", 2)
	else break
end; }

if !opts[:srchpath].end_with?("/") then 
	#add a "/" at the end if needed, necessary for globbing to find the needed files
	opts[:srchpath]+="/" 
end

#not strictly necessary test, but allows a more tailored error message
if !File.directory?(opts[:srchpath])
	$stderr.puts("\nERROR: Directory specified needs to be a directory. You specified #{opts[:srchpath]}.\n")
	exit(3)
end
#end option parsing/sanitizing section

#begin actual script
puts("Recursively searching under directory '#{opts[:srchpath]}' for test files to test '#{opts[:cmd]}' with.")

test_count = 0
worked = 0
did_not_run = 0
has_no_expected_output = 0
messages = []

Dir["#{opts[:srchpath]}**/input.scss"].each do |input_file|
	#test the file
	test_count += 1
	spec_dir = File.dirname(input_file)

	outfile = File.join(spec_dir, "output.out")
	expected_file = File.join(spec_dir, "expected_output.css")
	
	if !File.exists?(expected_file) #there is no expected_output.css file acompanying
		did_not_run += 1
		has_no_expected_output += 1
		$stderr.puts("ERROR: #{input_file} has no accompanying expected_output.css, skipping test.")
		next
	end

	`#{opts[:cmd]} #{input_file} > #{outfile} 2> /dev/null`

	if $?.to_i != 0 #cmd failed
		err_message = "Command '#{opts[:cmd]} #{input_file}' terminated unsuccessfully with error code #{$?.to_i}."
		$stderr.puts("ERROR: " + err_message)
		`rm "#{outfile}"`
		did_not_run += 1
		if !opts[:skip]
			$stderr.puts("Exiting, make sure '#{opts[:cmd]}' is available from your $PATH or use the -s or --skip option to skip tests that fail to exit successfully.")
			exit(4)
		end
		message = "Failed test in #{spec_dir}\n"
		message << err_message
		messages << message
		next
	end

	output_from_test = File.read(outfile)
	expected_output = File.read(expected_file)

	if expected_output.strip != output_from_test.strip
		if opts[:verbose]
			puts("Failed for #{input_file}.")
		else
			print "F"
		end
		message = "Failed test in #{spec_dir}\n"
		message << `diff -rub #{expected_file} #{outfile}`
		messages << message
	else
		worked += 1
		if !opts[:fails]
			if opts[:verbose]
				puts("Passed for #{input_file}.")
			else
				print "."
			end
		end
	end

	`rm "#{outfile}"`
end

if test_count == 0
	puts("No tests were run, please make sure this is the correct directory and it has input files under it somewhere unhidden.")
	exit(0)
else
	puts("")
	outmessage = "#{test_count} tests found. "
	if did_not_run > 0
		outmessage += "#{did_not_run} of them were not run"
		if has_no_expected_output == did_not_run
			outmessage += " due to not having an expected output.\n"
		elsif has_no_expected_output == 0
			outmessage += " due to unsuccessful termination.\n"
		else
			outmessage += ":\n#{has_no_expected_output} of them because of no expected output\n#{did_not_run - has_no_expected_output} of them because of unsuccessful termination.\n"
		end
	end
	outmessage += "Of the #{test_count - did_not_run} that ran, #{worked} passed."
	puts(outmessage)
end

if messages.length > 0
	if !opts[:nolog]
		puts("\n================================\nTEST FAILURES!\n\n")
		puts(messages.join("\n-----------\n"))
		puts("\n")
	end	
	exit(1)
else
	puts("GG, WP")
	exit(0)
end
#end actual script
