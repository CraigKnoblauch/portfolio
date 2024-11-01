# Scope
Until the primary portfolio is done, this serves to capture and show off the current state and project.

# Requirements
1. Static site requiring no or minimal js
2. Side bar table of contents
3. Picture support
4. Gif support
5. Code snippet support
6. Easy reading experience on mobile and desktop
7. Can build pages from markdown files (or an alternative portable format if one is better)
8. Contact form

# Potential solution options
For any solution, I'll need some webservice that I can post to to satisfy requirement 8. I'm sure the solution to that requirement won't differ greatly depending on what complete solution I pick.

## HTML and Tailwind CSS
Get a program that can convert a directory structure and markdown files into the page structure. Use a css library to get a personal look at that matches your requirements.

## React app
Create a simple react app that gets the look I'm looking for. Include logic to process directory structure and markdown files into components
If I made a react app, I could reuse the code for the eventual "down the rabbit hole" section of the portfolio site.

## Documentation generator
Something like Sphinx or Read The Docs. Wouldn't get a custom look, but would be a relatively low ramp up to getting requirements 1, 2, 3, 5, 6, and 7 satisfied. As long as I can process markdown files and include gifs this should be the best option.

# MkDocs
Hits all requirements, and the default Read The Docs theme is everything I need. 
Still need to see how I can get a contact form working in there. Or maybe I just include social icons.
