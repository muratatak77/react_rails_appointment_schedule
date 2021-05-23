class DateUtil

  def self.convert_to_string(date)
    res = date.strftime('%l:%M%p').strip
    res
  end

end
