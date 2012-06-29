module Foundation
  module Sass::Script::Functions
    def convert_number_to_word(number)
      val = case number
      when 1 then "one"
      when 2 then "two"
      when 3 then "three"
      when 4 then "four"
      when 5 then "five"
      when 6 then "six"
      when 7 then "seven"
      when 8 then "eight"
      when 9 then "nine"
      when 10 then "ten"
      when 11 then "eleven"
      when 12 then "twelve"
      when 13 then "thirteen"
      when 14 then "fourteen"
      when 15 then "fifteen"
      when 16 then "sixteen"
      else
        "invalid"
      end
      # Sass::Script::String.new(number.value.en.numwords)
      Sass::Script::String.new(val)
    end
    declare :convert_number_to_word, :args => [:number]
  end
end