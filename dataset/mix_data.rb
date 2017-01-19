require 'csv'
require 'json'

#read CSV file
restaurants_csv = CSV.read('restaurants_info.csv', {col_sep: ';'})

restaurants_csv_hash = {}

#remove first row titles
titles_array = restaurants_csv.shift

restaurants_csv.each do |row|

  row_hash = {}

  row_hash['food_type'] = row[1]
  row_hash['stars_count'] = row[2].to_f
  row_hash['reviews_count'] = row[3].to_i
  row_hash['neighborhood'] = row[4]
  #row_hash['phone'] = row[5]
  row_hash['price_range'] = row[6]
  row_hash['dining_style'] = row[7]

  #puts row_hash

  restaurants_csv_hash[row[0]] = row_hash

end

#read restaurants JSON
restaurants_json_file = File.read('restaurants_list.json')
restaurants_json_array = JSON.parse(restaurants_json_file)

result_json = []

restaurants_json_array.each do |restaurant|

  restaurant_csv = restaurants_csv_hash[restaurant['objectID'].to_s]

  puts "******restaurant_csv"
  puts restaurant_csv

  if !restaurant_csv.nil?
    restaurant_merged = restaurant.merge restaurant_csv
  end

  puts "restaurant_merged"
  puts restaurant_merged

  result_json << restaurant_merged

end

#create final json file
File.open("final_restaurants.json","w") do |f|
  f.write(result_json.to_json)
end

