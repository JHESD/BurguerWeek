const path = require("path");
const fs = require("fs");
const { Hamburguesa, Restaurante } = require("../models");

exports.adminList = async (req, res) => {
  const hamburguesas = await Hamburguesa.findAll({
    include: [Restaurante]
  });
  res.render("admin/hamburguesas", { hamburguesas });
};

exports.formNuevo = async (req, res) => {
  const restaurantes = await Restaurante.findAll();
  res.render("admin/hamburguesa_nueva", { restaurantes });
};

exports.guardar = async (req, res) => {
  let foto = null;
  if (req.files && req.files.imagen) {
    foto = Date.now() + "_" + req.files.imagen.name;
    const uploadPath = path.join(__dirname, "../public/uploads", foto);
    await req.files.imagen.mv(uploadPath);
  }
  
  await Hamburguesa.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: parseFloat(req.body.precio), // si tenés el campo
    foto,
    restaurante_id: req.body.restaurante_id
  });  

  res.redirect("/adminH/hamburguesas");
};

exports.formEditar = async (req, res) => {
  const hamburguesa = await Hamburguesa.findByPk(req.params.id);
  const restaurantes = await Restaurante.findAll();
  res.render("admin/hamburguesa_editar", { hamburguesa, restaurantes });
};

exports.actualizar = async (req, res) => {
  const hamburguesa = await Hamburguesa.findByPk(req.params.id);
  let imagen = hamburguesa.imagen;

  if (req.files && req.files.imagen) {
    imagen = Date.now() + "_" + req.files.imagen.name;
    const uploadPath = path.join(__dirname, "../public/uploads", imagen);
    await req.files.imagen.mv(uploadPath);
  }

  await hamburguesa.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    calificacion: req.body.calificacion,
    imagen,
    restaurante_id: req.body.restaurante_id
  });

  res.redirect("/adminH/hamburguesas");
};

exports.eliminar = async (req, res) => {
  await Hamburguesa.destroy({ where: { id: req.params.id } });
  res.redirect("/adminH/hamburguesas");
};
