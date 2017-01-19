This is the solution to the Solution Engineering team at Algolia.

I used React + redux, with algolia search helper js to develop a restaurant search demo webapp.

In order to create `final_restaurants.json` file mixing all the data from `restaurants_list.json` and `restaurants_info.csv` I implemented a Ruby script.

To run the script you need to have ruby 2.3.2 installed, go to `dataset/` folder, open the terminal and run:

`ruby mix_data.rb` 

## Local Setup
Having npm installed, go to the folder of the project and type in your terminal:

1. `npm install`
2. `npm start`
3. Go to 'dist/' folder and run
3. `serve`

## Access to dev or prod deploy
1. Local: Once you have done the Local Setup visit http://localhost:3000 on your browser
2. Prod: Visit http://www.tomasmadariaga.com/restaurant_search_algolia/ on your browser