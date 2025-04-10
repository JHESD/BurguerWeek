const path = require("path");
const fs = require("fs");
const { Restaurante } = require("../models");

exports.adminList = async (req, res) => {
  const restaurantes = await Restaurante.findAll();
  res.render("admin/restaurantes", { restaurantes });
};

exports.formNuevo = (req, res) => {
  res.render("admin/restaurante_nuevo");
};

exports.guardar = async (req, res) => {
  let logo = null;
  if (req.files && req.files.logo) {
    logo = Date.now() + "_" + req.files.logo.name;
    const uploadPath = path.join(__dirname, "../public/uploads", logo);
    await req.files.logo.mv(uploadPath);
  }

  await Restaurante.create({
    nombre: req.body.nombre,
    logo
  });

  res.redirect("/admin/restaurantes");
};

exports.formEditar = async (req, res) => {
  const restaurante = await Restaurante.findByPk(req.params.id);
  res.render("admin/restaurante_editar", { restaurante });
};

exports.actualizar = async (req, res) => {
  const restaurante = await Restaurante.findByPk(req.params.id);
  let logo = restaurante.logo;

  if (req.files && req.files.logo) {
    logo = Date.now() + "_" + req.files.logo.name;
    const uploadPath = path.join(__dirname, "../public/uploads", logo);
    await req.files.logo.mv(uploadPath);
  }

  await restaurante.update({
    nombre: req.body.nombre,
    logo
  });

  res.redirect("/admin/restaurantes");
};

exports.eliminar = async (req, res) => {
  await Restaurante.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/restaurantes");
};
