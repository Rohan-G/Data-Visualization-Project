# Mid Submission Report

## Driver Head To Head

* Drivers cannot be solely compared to all other drivers based on number of wins or number of points in a season. This is because even though driver ability has a part to play in these aspects, the car has a very significant hand in influencing these features. They say that F1 us a team sport. While this may be true, your teammate is the one you absolutely must beat at all costs, as they have the same car as you. If you cannot beat the one with the same car as you, how can you believe that you can stand toe to toe against the best in the world, and deserve to be called the world champion (an unspoken rule in the F1 world - you need to be confident enough to think you are the best in the world).

* Hence, we have created a visualization (from the 2003 season onwards) to compare a driver to the sum total of their teammates in terms of points, using 2 distinct line graphs (Line graphs make it easier to visually compare 2 values along with progression over time). The blue line depicts the selected driver's points, and the red line their teammate's. Beside the graph, we placed a picture of the driver and the driver's name. Underneath the picture and name, we have a portion which shows a message. On hovering over one of the lines representing a particular season, we get a message if the driver didn't race in that season, and a points comparison if they did. This gives users a view of how the driver performs compared to other drivers in the same car, and hence provides a better (still not highly accurate) qualitative review of the driver's performance. Hovering over one of the lines (either yours or your teammate's) highlights it (attempting to superimpose it).

* Potential Improvements: Add functionality to the points(the circles), add superimposition of lines on hovering, add a legend and label axes, add animation to the lines. 

* Instructions to run:
```Bash
# Inside the website folder
npm i
npm start
```

![Screenshot of website](./WebsitePic.png)


<br><br>

## Diversity of F1

* For a long time, Formula 1 has been criticized for being a sport dominated by wealthy white Europeans. However, in recent years, there has been a concerted effort to diversify the sport and make it more inclusive for people from different regions and backgrounds.
One of the ways that F1 is doing this is by expanding the number of tracks around the world. F1 now has races in various countries across the globe, from small European nations to places like the United States, Mexico, Canada, and the Middle East. By hosting events in different regions, F1 is helping to promote the sport to new audiences and provide opportunities for aspiring drivers from diverse backgrounds.

* To provide a visual representation of F1's global expansion, we have created a new interactive visualization. The visualization features a globe that displays all current circuits for the 2023 season, as well as future and returning circuits for the 2024 season. Each country that hosts an F1 track is highlighted in red, and clicking on a country changes the color to green and displays pictures of all the race tracks, along with their names and locations on the right-hand side of the screen. In addition, the visualization showcases current drivers and recent drivers who have participated in F1 since 2010, with their photos displayed prominently. The globe is fully interactive, with zooming in and out and dragging functionality, and rotates at a constant speed, providing users with an engaging and informative experience. This visualization offers a unique and immersive way for fans to explore F1's global expansion and its diverse lineup of drivers.
* Potential Improvements : Add functionality to zoom into a country on being clicked, add data for more circuits and drivers

<br>

![Globe](./tracksOnGlobe.png)

# Final Set Of Visualizations:
* Grid showing top 10 drivers from each season based on points (along with information about wins, poles, finishes in points).
* Globe showing diversity of tracks and drivers, need to expand the dataset a little bit more.
* Top 10 drivers statistics based on championships, points, wins (done) + Top 10 constructors based on metrics such as wins, championships, etc (yet to do) + on clicking a circle it shows up a nested svg where we show a visualization about the points/position per race of that season.(yet to do)
* Direct comparisons of drivers over their career - select both drivers instead of just 1, and display more information like number of wins, number of points per season, number of poles, average position (partially done)
* Create a dynamic disc diagram for checking engine performance - starts off with direct comparison of engine providers in a disc with layers representing different aspects of comparison - average points per season, average position. Clicking on one of the partitions zooms into a disc depicting specific information of that particular engine in that particular aspect over all the seasons it has been part of the sport along with all the different teams it has provided to.
* A growing line graph showing race progression lap-by-lap from the starting grid i.e. qualifying order to the final finishing order (yet to do). We can do the same to show the qualifying results from Q1, Q2 and then to Q3 finally. Basically you can choose the race and year from a dropdown for this. (we might integrate this with the radial chart previously mentioned if time permits)
* Sankey of championships percentages with one column as drivers and other column as constructor.
* 