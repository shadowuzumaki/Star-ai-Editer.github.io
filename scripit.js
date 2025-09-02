$(document).ready(function() {
    loadMovies();
    addParticles();
    animateOnScroll();
    
    // Add typing effect to logo
    const logoText = 'StarVideo';
    let i = 0;
    $('.logo').text('');
    const typeWriter = setInterval(() => {
        $('.logo').text(logoText.substring(0, i + 1));
        i++;
        if (i >= logoText.length) clearInterval(typeWriter);
    }, 150);
});

function loadMovies() {
    $.getJSON('movie.json', function(movies) {
        const popularMovies = movies.filter(movie => movie.category === 'Popular');
        const actionMovies = movies.filter(movie => movie.category === 'Action');
        const dramaMovies = movies.filter(movie => movie.category === 'Drama');
        
        displayMovies(popularMovies, '#popular-movies');
        displayMovies(actionMovies, '#action-movies');
        displayMovies(dramaMovies, '#drama-movies');
    });
}

function displayMovies(movies, container) {
    const movieContainer = $(container);
    movieContainer.empty();
    
    movies.forEach((movie, index) => {
        const movieItem = $(`
            <div class="movie-item" style="background-image: url('${movie.image}'); animation-delay: ${index * 0.1}s" 
                 onclick="openPopup('${movie.title}', '${movie.description}')">
                <div class="movie-overlay">
                    <h4>${movie.title}</h4>
                    <p>Click to watch</p>
                </div>
            </div>
        `);
        movieContainer.append(movieItem);
    });
}

function openPopup(title, description) {
    $('#popup-title').text(title);
    $('#popup-description').text(description);
    $('#moviePopup').css('display', 'flex').hide().fadeIn(300);
    $('body').css('overflow', 'hidden');
}

function closePopup() {
    $('#moviePopup').fadeOut(300);
    $('body').css('overflow', 'auto');
}

// Search functionality
$('.search input').on('input', function() {
    const searchTerm = $(this).val().toLowerCase();
    $('.movie-item').each(function() {
        const movieTitle = $(this).attr('onclick').toLowerCase();
        if (movieTitle.includes(searchTerm)) {
            $(this).fadeIn(200);
        } else {
            $(this).fadeOut(200);
        }
    });
});

function addParticles() {
    for(let i = 0; i < 50; i++) {
        const particle = $('<div class="particle"></div>');
        particle.css({
            position: 'fixed',
            width: Math.random() * 3 + 'px',
            height: Math.random() * 3 + 'px',
            background: '#e50914',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            borderRadius: '50%',
            opacity: Math.random() * 0.5,
            animation: `float ${Math.random() * 10 + 5}s linear infinite`,
            zIndex: 1
        });
        $('body').append(particle);
    }
}

function animateOnScroll() {
    $(window).scroll(function() {
        $('.movies-list').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    });
}

// Add CSS for particles animation
$('<style>').text(`
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
    }
    .animate-in {
        animation: slideInLeft 0.8s ease-out;
    }
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
`).appendTo('head');

// Smooth scrolling
$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $($(this).attr('href'));
    if(target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - 100
        }, 800);
    }
});