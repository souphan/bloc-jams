var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point) {
        point.style.opacity = 1;
        point.style.transform = "scaleX(1) translateY(0)";
        point.style.msTransform = "scaleX(1) translateY(0)";
        point.style.WebkitTransform = "scaleX(1) translateY(0)";
    };

var animatePoints = function(points) {                    
    forEach(points, revealPoint);
};

window.onload = function() {
      if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
    var sellingPoints = document.getElementsByClassName('selling-points')[0];//sellingPoints is an array, so we need bracket to choose the first index.
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    window.addEventListener('scroll', function(event) {
       if (document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);    
       }
});
}
    /* var revealSecondPoint = function() {
        points[1].style.opacity = 1;
        points[1].style.transform = "scaleX(1) translateY(0)";
        points[1].style.msTransform = "scaleX(1) translateY(0)";
        points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
        points[1].style.border = "2px solid pink";
        points[1].style.msBorder = "2px solid pink";
        points[1].style.WebkitBorder = "2px solid pink";
        points[reveal].style.border = "2px solid pink";
        points[reveal].style.msBorder = "2px solid pink";
        points[reveal].style.WebkitBorder = "2px solid pink";
    };
                    
     var revealThirdPoint = function() {
        points[2].style.opacity = 1;
        points[2].style.transform = "scaleX(1) translateY(0)";
        points[2].style.msTransform = "scaleX(1) translateY(0)";
        points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
        points[2].style.border = "2px solid pink";
        points[2].style.msBorder = "2px solid pink";
        points[2].style.WebkitBorder = "2px solid pink";
    };*/