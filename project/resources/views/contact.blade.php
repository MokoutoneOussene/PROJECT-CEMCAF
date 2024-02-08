@extends('layouts.main')

@section('content')

<!-- ======= Contact Section ======= -->
<section id="contact" class="contact">
    <div class="container" data-aos="fade-up">

        <div class="section-header">
            <h2>Contactez nous</h2>
            <p>Pour un renseignement ou tout autres besoins, veuillez nous contacter pour plus d'informations</p>
        </div>

        <div class="row gx-lg-0 gy-4">

            <div>
                <iframe style="border:0; width: 100%; height: 270px;"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                    frameborder="0" allowfullscreen></iframe>
            </div>

            <div class="col-lg-4">

                <div class="info-container d-flex flex-column align-items-center justify-content-center">
                    <div class="info-item d-flex">
                        <i class="bi bi-geo-alt flex-shrink-0"></i>
                        <div>
                            <h4>Location :</h4>
                            <p>OUAGADOUGOU, Passpanga, Avenue 56,</p>
                            <p>BP, 6147 OUAGA C.N.T 10000</p>
                        </div>
                    </div><!-- End Info Item -->

                    <div class="info-item d-flex">
                        <i class="bi bi-envelope flex-shrink-0"></i>
                        <div>
                            <h4>Email :</h4>
                            <p>infos@cemcaf.com</p>
                            <p>cemcafbf@gmail.com</p>
                        </div>
                    </div><!-- End Info Item -->

                    <div class="info-item d-flex">
                        <i class="bi bi-phone flex-shrink-0"></i>
                        <div>
                            <h4>Téléphone :</h4>
                            <p>+226 25 33 50 15</p>
                            <p>+226 70 57 44 06</p>
                        </div>
                    </div><!-- End Info Item -->

                    <div class="info-item d-flex">
                        <i class="bi bi-clock flex-shrink-0"></i>
                        <div>
                            <h4>Heure d'ouverture:</h4>
                            <p>Lundi-Samedi: 08h - 17h</p>
                        </div>
                    </div><!-- End Info Item -->
                </div>

            </div>

            <div class="col-lg-8">
                <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <input type="text" name="name" class="form-control" id="name"
                                placeholder="Votre nom" required>
                        </div>
                        <div class="col-md-6 form-group mt-3 mt-md-0">
                            <input type="email" class="form-control" name="email" id="email"
                                placeholder="Votre email" required>
                        </div>
                    </div>
                    <div class="form-group mt-3">
                        <input type="text" class="form-control" name="subject" id="subject"
                            placeholder="Objet" required>
                    </div>
                    <div class="form-group mt-3">
                        <textarea class="form-control" name="message" rows="7" placeholder="Votre message ici ..." required></textarea>
                    </div>
                    <div class="text-center"><button type="submit">Envoyer le message</button></div>
                </form>
            </div><!-- End Contact Form -->

        </div>

    </div>
</section><!-- End Contact Section -->

@endsection
