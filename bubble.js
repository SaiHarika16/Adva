$(document).ready(function() {
    var $bubbles = $('.bubbles');

    function bubbles() {
        // Settings
        var min_bubble_count = 20,
            max_bubble_count = 60,
            min_bubble_size = 10,
            max_bubble_size = 30;

        // Clear existing bubbles
        $bubbles.empty();

        // Calculate a random number of bubbles
        var bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count - min_bubble_count + 1));

        // Create bubbles
        for (var i = 0; i < bubbleCount; i++) {
            $bubbles.append('<div class="bubble-container"><div class="bubble"></div></div>');
        }

        // Randomize bubble styles
        $bubbles.find('.bubble-container').each(function() {
            var $this = $(this);

            var pos_rand = Math.floor(Math.random() * 100) + 'vw'; // Use viewport width
            var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size - min_bubble_size + 1)) + 'px';
            var delay_rand = Math.floor(Math.random() * 15) + 's';
            var speed_rand = Math.floor(Math.random() * 5) + 5 + 's'; // Adjust speed
            var blur_rand = Math.floor(Math.random() * 3) + 'px';

            $this.css({
                'left': pos_rand,
                'bottom': '-10%', // Start below the viewport
                'position': 'absolute', // Ensure positioning
                'animation': `rise ${speed_rand} ease-in forwards`,
                'animation-delay': delay_rand,
                'filter': 'blur(' + blur_rand + ')'
            });

            $this.children('.bubble').css({
                'width': size_rand,
                'height': size_rand,
                'border-radius': '50%', // Make bubbles round
                'background': 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
                'position': 'absolute', // Ensure positioning
                'bottom': '0'
            });
        });
    }

    // Toggle bubbles
    $('.bubble-toggle').click(function() {
        if ($bubbles.is(':empty')) {
            bubbles();
            $bubbles.show();
            $(this).text('Bubbles Off');
        } else {
            $bubbles.fadeOut(function() {
                $(this).empty();
            });
            $(this).text('Bubbles On');
        }
        return false;
    });

    // Initial bubble creation
    bubbles();
});


<div class="bubbles"></div>
  <button class="bubble-toggle">Bubbles Off</button>
    <section class="container-fluid vh-100 d-flex align-items-center justify-content-center"></section>
    /* Bubble Animation Styles */
@keyframes rise {
    from {
        bottom: -10%;
        opacity: 1;
    }
    to {
        bottom: 110%;
        opacity: 0;
    }
}

.bubbles {
    position: fixed; /* Make sure bubbles are positioned relative to the viewport */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none; /* Prevent interaction with bubbles */
}

.bubble {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    opacity: 0.7;
    pointer-events: none;
    z-index: 1000;
    animation: bubble-animation 10s infinite;
}

.bubble-1 {
    width: 40px;
    height: 40px;
    animation-duration: 8s;
}

.bubble-2 {
    width: 30px;
    height: 30px;
    animation-duration: 12s;
}

.bubble-3 {
    width: 50px;
    height: 50px;
    animation-duration: 15s;
}

@keyframes bubble-animation {
    0% {
        transform: translateY(100vh) scale(1);
        opacity: 0.7;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        transform: translateY(-100px) scale(1.5);
        opacity: 0;
    }
}

/* Add bubbles to your page using JS or directly in HTML */
