<!DOCTYPE html>
<html lang="en">

<head>
    @include('layouts.style')
</head>

<body>

    @include('require.header')
    <!-- End Header -->

    <main id="main">

        <!-- ======= About Us Section ======= -->
        @yield('content')

    </main><!-- End #main -->

    <!-- ======= Footer ======= -->
    @include('require.footer')
    <!-- End Footer -->

    <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>

    <div id="preloader"></div>

    @include('layouts.js')

</body>

</html>
