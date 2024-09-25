require "nokogiri"
require "open-uri"
require "csv"

def get_cyclists(url, csv, first_column_is_th = false)
  doc = Nokogiri::HTML(URI.open(url))
  table = doc.css("table")[1]

  table.css("tr").each do |tr|
    first_column = first_column_is_th ? tr.at_css("th") : tr.at_css("td")
    second_column = tr.css("td")[first_column_is_th ? 0 : 1]

    if first_column && second_column
      cleaned_data = [first_column, second_column].map { |col| col.text.delete("\n").strip }
      csv << cleaned_data
    end
  end
end

CSV.open("cyclists.csv", "w") do |csv|
  csv << ["Year", "Cyclist"]

  get_cyclists("https://en.wikipedia.org/wiki/UCI_Road_World_Championships_%E2%80%93_Men%27s_road_race", csv)
  get_cyclists("https://en.wikipedia.org/wiki/UCI_Road_World_Championships_%E2%80%93_Women%27s_road_race", csv, true)
end
