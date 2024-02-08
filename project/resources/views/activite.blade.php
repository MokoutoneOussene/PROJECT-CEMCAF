@extends('layouts.main')

@section('content')

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
                        <img src="{{asset('img/audit.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Audit légal & contractuel</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/Ingenierie.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Ingénierie financière</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/images.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Etude, développement rural</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/téléchargement.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Comptabilité conseil juridique fiscalité</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/financement.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Recherche de financement</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/creation.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Création, Structuration d'entreprise</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/evaluation.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Evaluation d'entreprise</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/formation.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Formation certification</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/assistance.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Conseils et assistance aux entreprises</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

            <div class="col-xl-3 col-md-6">
                <article>

                    <div class="post-img">
                        <img src="{{asset('img/ressource.jpeg')}}" alt="" class="img-fluid" style="width: 100%; height: 30vh;">
                    </div>
                    <h2 class="title">
                        <a href="#">Gestion des ressources humaines et sociales</a>
                    </h2>
                </article>
            </div><!-- End post list item -->

        </div><!-- End recent posts list -->
    </div>

</section><!-- End Recent Blog Posts Section -->

@endsection
