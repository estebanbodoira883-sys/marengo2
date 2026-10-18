// Marengo Motos - lógica de los carruseles (sin dependencias)
document.querySelectorAll('.mg-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.mg-carousel__track');
    var nav = carousel.querySelector('.mg-carousel__nav');
    var buttons = carousel.querySelectorAll('.mg-btn');

    function atStart() { return track.scrollLeft <= 2; }
    function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; }

    function move(dir) {
        if (dir > 0 && atEnd()) {
            track.scrollTo({ left: 0 });                       // vuelve al principio
        } else if (dir < 0 && atStart()) {
            track.scrollTo({ left: track.scrollWidth });       // salta al final
        } else {
            track.scrollBy({ left: dir * track.clientWidth });
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            move(parseInt(btn.dataset.dir, 10));
        });
    });

    track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
    });

    // Oculta los botones si todas las imágenes entran sin desplazar
    function toggleNav() {
        nav.classList.toggle('is-hidden', track.scrollWidth <= track.clientWidth + 2);
    }
    toggleNav();
    window.addEventListener('resize', toggleNav);
    window.addEventListener('load', toggleNav);
});
