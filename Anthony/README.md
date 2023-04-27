HTML

Access token: WzNqxFqd7smFa7dvkj7j
 - Hyper Text Markup Language

<!DOCTYPE> - Declaration, defines that document is5

> - Root element of an page

<head> - Contains meta information about the page.

<title> - Specifies a title of

<body> - Documents body, it is a container for all visible content


Start tag/ End tag -  the element is what’s in between the start tag and end tag.
ex. <h1> My First Heading </h1>

<Body> section is displayed in a browser, content inside title will show on browsers title bar


Udemy.com/course/ultimate-web/learn/lecture/6700532#notes
 : Lists, Paragraphs and test
<I> - Italicizing 
<b> - Bold letters
<em> - emphasize the letters
	- difference between <em> and <I>


CSS

CSS- Cascading Style Sheet
Version 3

Changing Text Colors
1. Inline styling 
<tag style = “color:green;”>

Making boarder
<3px solid red>
- Can be dotted

2. Internal Styling 
Tag { 
color: purple; 
}

3. External CSS (Recommended)
    1. Create CSS file
    2. Link the CSS file <link rel ="stylesheet" href = "styleLearning.css">
    3. Creating classes
        1. When creating a class it can be applied to every thing within it. Ex h1 will always have whatever class when its used.
    4. ID’s
        1. Used for interaction with Javascript

Colors:

Making Containers

<div class = “container” >
Wrap it around h1/h2

<div class = “container” >
	<h1> ……..
	<h2> ……..

Color Ways


Color:rbg
Color:#
Color:red


Gradients
To choose direction of the gradient just put “to right” etc. Where the “&” is at below.
Background:linear-gradient(& #00ccff, #b3f0ff);


Shadows:
1/2 elements 2px by 2px makes thickness of the shadow

3 element 5px will lighten the black so that its softer

Text-shadow: 2px 2px 5px black;

Background shadow
- Box-shadow: 3px 5px 3px black; 

Background-image: url(AlavishSneakersLogo.png); 
Background-repeat: no-repeat; 
Background-size: cover;

Inspector Tools
- 
Descendants / Lists
<

Specificity (Needs more work for understanding)

- Colors take precedence depending on area
- The one first takes precedence 
- Div with most elements takes precedence


!important tag will override everything, only use it for bootstrap etc. will mess up code at times.

Specificity Chart 	

Each category has its own number precedence.

- Style  | ID       |Class       |Elements |
	

CSS Intermediate

Text Styling:
Hyper link: <a href = "#">Click Me For Shoes</a>

Keeps image adjusted to the screen*/
    max-width: 100%;
    height: auto;
    padding: 5px;

 Makes a circle of a perfect square */
    border-radius: 50%;
    width: 500px;
    height: 500px;


Spaced Boarder:
    border: 2px dotted blue;
    padding: 5px;

Creating a button:
<div>
        <button type = "button" class "padding"> Click If Alavish's Sneakers Are The Best </button>
    </div>

Padding increases space WITHIN an element. Margin puts space AROUND an element

Adding max - width: 100%
and width: 100% will fit 100% of element

Mobile Styling
- Style for mobile devices right after stying for desktop each element then make sure it collapses correctly


-text-transform can change text

what does hover do?
li:not(:nth-child(1))

@media screen and (max-width:680px){
    - Helps website figure out what user is suing


Java Script Interaction:

Embedded javaScript

Cascadia styling sheet

Line 11 Not Working had to debug

In lines 114/110 of styling 


(NEVER MIND) (BRAIN FART)
Im curious to why in tutorial my syntax for specificity tag is "div.leftside-col" which doesnt do what I need but when i do ".div.leftside-col" is puts everything to the left more

Cannot put headers inside of footers


Using shadow generator

box-shadow: 0 0 0 1px rgba(0,0,0,.15);

1 is horizontal lenght to left or right of shadow

2 vertical length 

blue radius

4 spread radius


rgba 1 shadow color, 2 background color , 3 box color , 4 opacity


JAVASCRIPT

<html>

<head></head>
<body>


<script type = "text/javascript">


</script>
</body>
</html>


Linking the script in header is the correct way
    <script type = "text/javascript" src = "learn-to-code.js/learn-to-code.js" ></script>

    Linking the javaScript file
    new file below:

    ************

var
var

var message = 


alert(message);

console.log(message);







    ***************
