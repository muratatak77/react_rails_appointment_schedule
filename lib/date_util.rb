class DateUtil

  def self.convert_to_string(date)
    date.strftime('%l:%M%p').strip!
  end

end
