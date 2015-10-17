var animatePoints = function() {
                    
    var points = document.getElementsByClassName('point');
                    
    var revealPoint = function(reveal) {
        points[reveal].style.opacity = 1;
        points[reveal].style.transform = "scaleX(1) translateY(0)";
        points[reveal].style.msTransform = "scaleX(1) translateY(0)";
        points[reveal].style.WebkitTransform = "scaleX(1) translateY(0)";
        points[reveal].style.border = "2px solid pink";
        points[reveal].style.msBorder = "2px solid pink";
        points[reveal].style.WebkitBorder = "2px solid pink";
    };
        for(var i = 0; i < points.length; i++) {
            revealPoint(i);
    };

};
    /* var revealSecondPoint = function() {
        points[1].style.opacity = 1;
        points[1].style.transform = "scaleX(1) translateY(0)";
        points[1].style.msTransform = "scaleX(1) translateY(0)";
        points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
        points[1].style.border = "2px solid pink";
        points[1].style.msBorder = "2px solid pink";
        points[1].style.WebkitBorder = "2px solid pink";
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