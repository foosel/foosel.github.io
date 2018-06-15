/*
    Prints speaker notes for a reveal.js presentation. 
    To print the notes, run the js function PrintRevealNotes()
    You need to disable the pop-up blocker
    
    Copyright 2016 Patrick G 
    http://geek1011.github.io
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var PrintRevealNotes = function() {
    /* Open the window */
    var w = window.open('about:blank'); /* Open a blank window */

    /* Write the titles */
    var doctitle = "Speaker notes for " + document.title + " Presentation";
    w.document.write('<html><head><title>' + doctitle + '</title></head><body>');
    w.document.write('<center><h1>' + doctitle + '</h1></center>');

    /* Search for slides */
    var slidesContainer = document.getElementsByClassName('slides')[0]; /* The parent element to search for slides and notes */
    var slides = []; /* The list of unique slides (no containers) */
    var allSlides = slidesContainer.getElementsByTagName('section'); /* All slides, even container ones */

    /* Filter the slides (remove the container slides) */
    for (var e in allSlides) {
        if (allSlides.hasOwnProperty(e)) { /* Make sure it is not an inherited object property */
            var el = allSlides[e];
            if (el.parentNode.tagName == "SECTION") { /* If it is in another slide, then it is a subslide */
                slides.push(el);
            } else { /* Not a subslide; either a container or a orphan slide */
                var isOwnSlide = true; /* Default to is an orphan slide */
                /* Check if not an orphan slide */
                for (var i in el.children) { /* Search for sub-slides by looping through children */
                    if (el.children.hasOwnProperty(i)) { /* Make sure it is not an inherited object property */
                        if (el.children[i].tagName == "SECTION") { /* Contains another slide, skip it */
                            isOwnSlide = false; /* Skip the slide */
                        }
                    }
                }
                if (isOwnSlide) { /* If it does not contain another slide, then it is an orphan slide */
                    slides.push(el);
                }
            }
        }
    }

    /* Write the notes page */
    var num = 0;
    for (var slide in slides) {
        if (slides.hasOwnProperty(slide)) { /* Make sure it is not an inherited object property */
            var el = slides[slide];
            var titleel = el.querySelector('h1, h2, h3, h4, h5, h6') || document.createElement('h1'); /* Look for a slide title, or create a blank one */
            num++;
            var title = num + ". " + titleel.innerText; /* Don't keep the html */
            var notesel = el.querySelector('aside.notes') || document.createElement('aside'); /* Look for notes, or create a blank one */
            var notes = notesel.innerHTML; /* Keep the html for formatting */
            w.document.write('<br><b>' + title + '</b><br>' + notes + '<br>');

        }
    }

    /* Write the stylesheet */
    w.document.write(
        '<style>@import url(http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800);body{padding:20px;color:#8e8071;font-size:15px;font-family:"Open Sans",AppleSDGothicNeo-Medium,"Segoe UI","Malgun Gothic",sans-serif;background:#fff;-webkit-font-smoothing:antialiased}a{color:#3269a0}a:hover{color:#4183c4}h1,h2,h3,h4,h5{font-weight:400;color:#5c5146;letter-spacing:-1px}h2{border-bottom:1px solid #e6e6e6;line-height:1.7em}h6{color:#777}hr{border:1px solid #e6e6e6}p{line-height:19px}p>code{font-family:"Open Sans",AppleSDGothicNeo-Medium,"Segoe UI","Malgun Gothic",sans-serif;color:#e86741;font-size:.9em}pre>code{font-size:1em;font-family:"Open Sans",AppleSDGothicNeo-Medium,"Segoe UI","Malgun Gothic",sans-serif;letter-spacing:-1px;font-weight:400}blockquote{border-left:4px solid #e6e6e6;padding:0 15px;font-style:italic;color:#e86741}table{background-color:#fafafa}table tr td,table tr th{border:1px solid #e6e6e6}table tr:nth-child(2n){background-color:#f2f2f2}</style></body></html>'
    );

    /* Finish up */
    w.document.close(); /* Close the document to prevent endless load on firefox */
    w.window.print(); /* Open the print dialog */
};