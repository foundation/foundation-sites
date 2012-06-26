module Foundation
  module Sass::Script::Functions
    def convert_number_to_word(number)
      Sass::Script::String.new(number.value.en.numwords)
    end
    declare :convert_number_to_word, :args => [:number]
  end
end