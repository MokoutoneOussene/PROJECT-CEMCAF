
<!-- ======= Header ======= -->
<section id="topbar" class="topbar d-flex align-items-center">
    <div class="container d-flex justify-content-center justify-content-md-between">
        <div class="contact-info d-flex align-items-center">
            <i class="bi bi-envelope d-flex align-items-center"><a
                    href="mailto:cemcafbf@gmail.com">cemcafbf@gmail.com</a></i>
            <i class="bi bi-phone d-flex align-items-center ms-4"><span>+226 25 33 55 15</span></i>
        </div>
        <div class="social-links d-none d-md-flex align-items-center">
            <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
            <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></i></a>
        </div>
    </div>
</section><!-- End Top Bar -->

<header id="header" class="header d-flex align-items-center bg-light">

    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="{{route('home')}}" class="logo d-flex align-items-center">
            <!-- Uncomment the line below if you also wish to use an image logo -->
            <img src="{{asset('img/LOGO_CEMCAF.jpg')}}" alt="logo cemcaf">
            {{-- <h1>Impact<span>.</span></h1> --}}
        </a>
        <nav id="navbar" class="navbar">
            <ul>
                <li><a class="text-dark" href="{{route('home')}}">Accueil</a></li>
                <li><a class="text-dark" href="#about">Qui sommes-nous ?</a></li>
                <li><a class="text-dark" href="#services">Nos valeurs</a></li>
                <li><a class="text-dark" href="#portfolio">Mediathèque</a></li>
                <li><a class="text-dark" href="{{route('activite')}}">Domaines d'activités</a></li>
                <li><a class="text-dark" href="{{route('contact')}}">Contact</a></li>
            </ul>
        </nav><!-- .navbar -->

        <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
        <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

    </div>
</header><!-- End Header -->
