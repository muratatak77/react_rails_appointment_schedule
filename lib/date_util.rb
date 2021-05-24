class DateUtil

  def self.convert_to_string(date)
    res = date.strftime('%l:%M%p').strip
    res
  end

  def self.time_zone_parse(time_zone)
    parsed = time_zone.gsub(/\(GMT.*?\)\s/, '')
    return get_convert_tz(parsed)
  end

  def self.get_convert_tz(tz)
    return "America/Chicago" if tz == "Central Time (US & Canada)"
    return tz
  end

end
