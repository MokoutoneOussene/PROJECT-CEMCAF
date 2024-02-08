@extends('layouts.main')

@section('content')
    <!-- ======= Hero Section ======= -->
    @include('require.banner')
    <!-- End Hero Section -->
    <section id="about" class="about">
        <div class="container" data-aos="fade-up">

            {{-- <section class="conteneur w-100">
                <div class="box">
                    <div>
                        <h1>QUI SOMMES NOUS ?</h1>
                        <p>Bienvenue chez CEMCAF votre Partenaire Entreprises !</p>
                    </div>
                </div>
            </section> --}}

            <div class="row gy-4">
                <div class="col-lg-6">
                    <img src="{{ asset('img/LOGO_CEMCAF.jpg') }}" class="img-fluid rounded-2 mb-4" alt="logo"
                        style="width: 90%; height: 60vh;">
                </div>

                <div class="col-lg-6">
                    <div class="content ps-0 ps-lg-5">
                        <h3 class="text-danger">Presentation</h3>
                        <p>
                            <span style="font-size: 30px; color: red">CEMCAF-BF</span>
                            <span style="font-size: 20px;">
                                est une société d’expertise comptable créée par un groupe des jeunes professionnels,
                                qui intervient non seulement dans les domaines traditionnels de la profession comptable à
                                savoir
                                l’audit, le commissariat aux comptes et l’expertise comptable mais réalise aussi des
                                missions à
                                fortes valeurs ajoutées dans divers domaines notamment la formation.
                            </span>
                        </p>
                    </div>
                </div>
            </div>


            <div class="row gy-4 mt-3">
                <div class="col-lg-6">
                    <div class="content ps-0 ps-lg-5">
                        <h3 class="text-danger">Notre mission</h3>
                        <p>
                            Vu que le contexte économique est marqué par l’accélération de la concurrence et
                            la libéralisation à l’échelle mondiale, seules les structures compétentes et
                            compétitives peuvent faire leur place dans cette rude bataille.
                        </p>
                        <p>
                            CEMCAF BF SAS
                            regorgeant de compétences révélées se donne pour leitmotiv l’accompagnement des
                            entreprises des secteurs privé et public, des administrations, des projets, des
                            associations et toute autre organisation dans leur élan d’émergence pour l’enracinement
                            du développement durable au Burkina Faso.
                        </p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img src="{{ asset('assets/img/cemcaf/2024-02-07-3.jpg') }}" class="img-fluid rounded-2 mb-4"
                        alt="logo" style="width: 90%; height: 60vh;">
                </div>
            </div>

            <div class="row gy-4 mt-3">
                <div class="col-lg-6">
                    <img src="{{ asset('assets/img/cemcaf/2024-02-07-2.jpg') }}" class="img-fluid rounded-2 mb-4"
                        alt="logo" style="width: 90%; height: 70vh;">
                </div>

                <div class="col-lg-6">
                    <div class="content ps-0 ps-lg-5">
                        <h3 class="text-danger">Notre vision</h3>
                        <p>
                            Etre le levier de création et de pérenité des entités aux plans national, sous régional et
                            international.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </section><!-- End About Us Section -->

    <!-- ======= Clients Section ======= -->
    <section id="clients" class="clients">
        <div class="container" data-aos="zoom-out">

            <div class="clients-slider swiper">
                <div class="swiper-wrapper align-items-center">
                    <div class="swiper-slide"><img src="{{ asset('assets/img/clients/1.jpg') }}" class="img-fluid"
                            alt=""></div>
                    <div class="swiper-slide"><img src="{{ asset('assets/img/clients/2.jpg') }}" class="img-fluid"
                            alt=""></div>
                    <div class="swiper-slide"><img src="{{ asset('assets/img/clients/3.jpg') }}" class="img-fluid"
                            alt=""></div>
                    <div class="swiper-slide"><img src="{{ asset('assets/img/clients/4.jpg') }}" class="img-fluid"
                            alt=""></div>
                    <div class="swiper-slide"><img src="{{ asset('assets/img/clients/Sinergi-Burkina.png') }}"
                            class="img-fluid" alt=""></div>
                </div>
            </div>

        </div>
    </section><!-- End Clients Section -->

    <!-- ======= Our Services Section ======= -->
    <section id="services" class="services sections-bg">
        <div class="container" data-aos="fade-up">

            <div class="section-header">
                <h2>Nos valeurs</h2>
                <p>CEMCAF BURKINA FASO SAS defend des valeurs suivantes :</p>
            </div>

            <div class="row gy-4" data-aos="fade-up" data-aos-delay="100">

                <div class="col-lg-4 col-md-6">
                    <div class="service-item  position-relative">
                        <div class="icon">
                            <i class="bi bi-activity"></i>
                        </div>
                        <h3>Le professionnalisme </h3>
                    </div>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6">
                    <div class="service-item position-relative">
                        <div class="icon">
                            <i class="bi bi-broadcast"></i>
                        </div>
                        <h3>L’accueil, l’écoute, la disponibilité</h3>
                    </div>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6">
                    <div class="service-item position-relative">
                        <div class="icon">
                            <i class="bi bi-easel"></i>
                        </div>
                        <h3>La responsabilité </h3>
                    </div>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6">
                    <div class="service-item position-relative">
                        <div class="icon">
                            <i class="bi bi-bounding-box-circles"></i>
                        </div>
                        <h3>L’esprit d’équipe</h3>
                    </div>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6">
                    <div class="service-item position-relative">
                        <div class="icon">
                            <i class="bi bi-calendar4-week"></i>
                        </div>
                        <h3>La satisfaction de nos clients</h3>
                    </div>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6">
                    <div class="service-item position-relative">
                        <div class="icon">
                            <i class="bi bi-chat-square-text"></i>
                        </div>
                        <h3>La recherche permanente de la qualité</h3>
                    </div>
                </div><!-- End Service Item -->

            </div>

        </div>
    </section><!-- End Our Services Section -->

    <!-- ======= Portfolio Section ======= -->
    <section id="portfolio" class="portfolio sections-bg">
        <div class="container" data-aos="fade-up">

            <div class="section-header">
                <h2>Mediathèques</h2>
                <p>Nous decouvrir à travers des photos et videos pour plus nous connaitre sur nos valeurs ajoutées</p>
            </div>

            <div class="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry"
                data-portfolio-sort="original-order" data-aos="fade-up" data-aos-delay="100">

                <div class="row gy-4 portfolio-container">

                    <div class="col-xl-4 col-md-6 portfolio-item filter-app">
                        <div class="portfolio-wrap">
                            <a href="assets/img/portfolio/app-1.jpg" data-gallery="portfolio-gallery-app"
                                class="glightbox"><img src="{{asset('assets/img/cemcaf/2024-02-07-8.jpg')}}" class="img-fluid" alt=""></a>
                        </div>
                    </div><!-- End Portfolio Item -->

                    <div class="col-xl-4 col-md-6 portfolio-item filter-product">
                        <div class="portfolio-wrap">
                            <a href="assets/img/portfolio/product-1.jpg" data-gallery="portfolio-gallery-app"
                                class="glightbox"><img src="{{asset('assets/img/cemcaf/2024-02-07-5.jpg')}}" class="img-fluid" alt=""></a>
                        </div>
                    </div><!-- End Portfolio Item -->

                    <div class="col-xl-4 col-md-6 portfolio-item filter-branding">
                        <div class="portfolio-wrap">
                            <a href="assets/img/portfolio/branding-1.jpg" data-gallery="portfolio-gallery-app"
                                class="glightbox"><img src="{{asset('assets/img/cemcaf/2024-02-07.jpg')}}" class="img-fluid" alt=""></a>
                        </div>
                    </div><!-- End Portfolio Item -->
                </div><!-- End Portfolio Container -->
            </div>
        </div>
    </section><!-- End Portfolio Section -->

    <!-- ======= Recent Blog Posts Section ======= -->
    <section id="domaines" class="recent-posts sections-bg">
        <div class="container" data-aos="fade-up">

            <div class="section-header">
                <h2>Nos domaines d'activités</h2>
            </div>

            <div class="row gy-4">

                <div class="col-xl-3 col-md-6">
                    <article>

                        <div class="post-img">
                            <img src="assets/img/blog/blog-1.jpg" alt="" class="img-fluid">
                        </div>
                        <h2 class="title">
                            <a href="#">Audit légal & contractuel</a>
                        </h2>
                    </article>
                </div><!-- End post list item -->

                <div class="col-xl-3 col-md-6">
                    <article>

                        <div class="post-img">
                            <img src="assets/img/blog/blog-2.jpg" alt="" class="img-fluid">
                        </div>
                        <h2 class="title">
                            <a href="#">Ingénierie financière</a>
                        </h2>
                    </article>
                </div><!-- End post list item -->

                <div class="col-xl-3 col-md-6">
                    <article>

                        <div class="post-img">
                            <img src="assets/img/blog/blog-3.jpg" alt="" class="img-fluid">
                        </div>
                        <h2 class="title">
                            <a href="#">Etude, développement rural</a>
                        </h2>
                    </article>
                </div><!-- End post list item -->

                <div class="col-xl-3 col-md-6">
                    <article>

                        <div class="post-img">
                            <img src="assets/img/blog/blog-3.jpg" alt="" class="img-fluid">
                        </div>
                        <h2 class="title">
                            <a href="#">Comptabilité conseil juridique fiscalité</a>
                        </h2>
                    </article>
                </div><!-- End post list item -->

            </div><!-- End recent posts list -->

            <div class="mt-4">
                <a href="{{ route('activite') }}" class="readmore stretched-link">Voir plus <i
                        class="bi bi-arrow-right"></i></a>
            </div>
        </div>

    </section><!-- End Recent Blog Posts Section -->
@endsection
