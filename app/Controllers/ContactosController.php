<?php

namespace App\Controllers;

use App\Models\Contacto;

class ContactosController{
    public function indexContacto($request){
        $loader = new \Twig\Loader\FilesystemLoader('../views');
        $twig = new \Twig\Environment($loader);
        $template = $twig->load('index.twig');
        echo $template->render();
    }
    public function guardarContacto($request){
        if ($request->getMethod() == 'POST'){
            $datosPost = $request->getParsedBody();

            if (Contacto::where('email', '=', $datosPost['email'])->count() > 0) {
                echo 'El usuario ya existe';
            }else{
                $contacto = new Contacto();
                $contacto->nombre = $datosPost['nombre'];
                $contacto->apellido = $datosPost['apellido'];
                $contacto->email = $datosPost['email'];
                $contacto->dni = $datosPost['dni'];
                $contacto->movil = $datosPost['movil'];
                $contacto->save();

                echo 'usuario creado correctamente';
            }
        }

    }
    public function listarContactos($request){
        $contactos = Contacto::all();

        $loader = new \Twig\Loader\FilesystemLoader('../views');
        $twig = new \Twig\Environment($loader);
        $template = $twig->load('listado.twig');
        echo $template->render(['contactos' => $contactos]);

        //include '../views/listado.php';
    }
}