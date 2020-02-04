import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  https://inmonitor.red70s.net/app_medios/
*/
@Injectable()
export class UserServiceProvider {
  // ip ='localhost';
  // ip2='192.168.10.128/inmonitor'
  ip2='inmonitor.red70s.net/app_movil';
  ip ="inmonitor.red70s.net/app_movil";
  // ip2 ='192.168.10.204/app_nal';

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }
  getUsers() {
    // return this.http.get('https://randomuser.me/api/?results=25');
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=noticias_get&id=2&TU=Geografico&Fc=2019-04-09');
  }
  getLogin(usr,psw,proyecto){
    //william&P=w1ll14m&Pr=SEO '+usr+'&P='+psw+'&Pr='+proyecto
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=login_get&U='+usr+'&P='+psw+'&Pr='+proyecto);
  }
  getUsuarios(usr){
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=user_get&U='+usr);
  }
  getSegment(id,tu,fc){
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=Segment_get&id='+id+'&TU='+tu+'&Fc='+fc);
  }
  getNotas(id,tu,fc){
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=noticias_get&id='+id+'&TU='+tu+'&Fc='+fc);
  }
  getGrafica(fecha,tipo,llaves) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=Grafica_get&Fc='+fecha+'&TU='+tipo+'&L='+llaves);
  }
  getTablaGeo(fecha,tipo,llaves) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=GraficaGeo_get&Fc='+fecha+'&TU='+tipo+'&L='+llaves);
  }
  getTabla2(fecha,tipo,llaves){
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=Tabla2_get&Fc='+fecha+'&TU='+tipo+'&L='+llaves);
  }
  getStatusTabla(id,fecha,tipo,llaves) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=TablaStatus_get&IP='+id+'&Fc='+fecha+'&TU='+tipo+'&L='+llaves);
  }
  getAnexosID(id) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=Anexos_get&id='+id);
  }
  getComentariosID(id) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=Comentarios_get&id='+id);
  }
  getComentar(id,user,Comentario){
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=SaveComentario_get&id='+id+'&U='+user+'&C='+Comentario);
  }
  getTemasBusqueda(tipo,llaves,fecha,fecha2) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=TemasBusqueda_get&TU='+tipo+'&L='+llaves+'&Fc='+fecha+'&Fc2='+fecha2);
  }
  getBusquedaEsp(id,fecha,fecha2,contenido,tipo,tipotema,tema) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=BusquedaEspecifica_get&id='+id+'&Fc='+fecha+'&Fc2='+fecha2+'&C='+contenido+'&TP='+tipo+'&TT='+tipotema+'&T='+tema);
  }
  getTabla2Busqueda(id,fecha,fecha2,contenido,tipo,tipotema,tema){
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=BusquedaArticulos_get&id='+id+'&Fc='+fecha+'&Fc2='+fecha2+'&C='+contenido+'&TP='+tipo+'&TT='+tipotema+'&T='+tema);
  }
  getGraficaBus(id,fecha,fecha2,contenido,tipo,tipotema,tema) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=GraficaBusTema_get&id='+id+'&Fc='+fecha+'&Fc2='+fecha2+'&C='+contenido+'&TP='+tipo+'&TT='+tipotema+'&T='+tema);
  }
  getTablaGeoBus(id,fecha,fecha2,contenido,tipo,tipotema,tema) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=TablaGeoBusq_get&id='+id+'&Fc='+fecha+'&Fc2='+fecha2+'&C='+contenido+'&TP='+tipo+'&TT='+tipotema+'&T='+tema);
  }
  getStatusTablaBus(id,fecha,fecha2,contenido,tipo,tipotema,tema) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=StatusTablaBusq_get&id='+id+'&Fc='+fecha+'&Fc2='+fecha2+'&C='+contenido+'&TP='+tipo+'&TT='+tipotema+'&T='+tema);
  }
  getReportes(tipo,id) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=ReportesGet&T='+tipo+'&id='+id);
  }
  getStatusGet(id) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=StatusGet_get&id='+id);
  }
  getReportesAgregar(id,usuario,proyecto,contenido,ruta,tipo,etiqueta,lat,long) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=GuardarReporte_get&id='+id+'&U='+usuario+'&P='+proyecto+'&C='+contenido+'&R='+ruta+'&T='+tipo+'&E='+etiqueta+'&LT='+lat+'&LN='+long);
  }
  getStatusInsert(id,status,color) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=InsertStatus_get&id='+id+'&S='+status+'&C='+color);
  }
  getStatusCambio(id,status,color) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=CambioStatus_get&id='+id+'&S='+status+'&C='+color);
  }
  getChatNotifi(user,id, app) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=chatNotificacion_get&U='+user+'&id='+id+'&A'+app);
  }
  getPersonasChat(Proyecto) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=ParticipantesChat_get&P='+Proyecto);
  }
  getActualizaApp(id_tok,llaves,usuario,app) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=LlavesApp2_get&TK='+id_tok+'&L='+llaves+'&U='+usuario+'&A='+app);
  }
  getRegistroApp(id_tok) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=RegistrarApp_get&TK='+id_tok);
  }
  getTopT(fecha,tipo,llaves,proyecto) {
    return this.http.get('https://'+this.ip2+'/Movil/controlador/seo.php?tipo=Top5_get&Fc='+fecha+'&TP='+tipo+'&L='+llaves+'&P='+proyecto);
  }
  // 
  // 
  getLogin2(usr,numero){
    // return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/login2/'+usr+'/'+numero);
  }
  getNoticias(tipo,fecha, llaves){
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/noticia_usuario/'+tipo+'/'+fecha+'/'+llaves);
  }
  getNoticias2(tipo,fecha, llaves, proyecto){
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/noticia_usuarioT/'+tipo+'/'+fecha+'/'+llaves+'/'+proyecto);
  }
  getComentarios() {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/Comentarios');   
  }
  getTop(fecha,tipo,llaves) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/Top5/'+fecha+'/'+tipo+'/'+llaves);
  }  
  getTemas(id) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/Temas/'+id);
  }
  getSubtemas(id) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/Subtemas/'+id);
  }
  getAmbito() {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/Ambito/');
  }
  getMunicipio() {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/Municipal/');
  }
  getLocalidad(id) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/Localidad/'+id);
  }
  getBlogPublic(Titulo,Contenido,Tema,Subtema,Condicion,Ambito,AmbitoID,Municipio,Localidad,Usuario,Proyecto,url) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/BlogPublicar/'+Titulo+'/'+Contenido+'/'+Tema+'/'+Subtema+'/'+Condicion+'/'+Ambito+'/'+AmbitoID+'/'+Municipio+'/'+Localidad+'/'+Usuario+'/'+Proyecto+'/'+url);
  }
  getBlog(id,fecha) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/Blog/'+id+'/'+fecha);
  }
  getBlogProp(id,user) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/BlogPropio/'+id+'/'+user);
  }
  getBlogActualiza(Id,Titulo,Contenido,Tema,Subtema,Condicion,Ambito,AmbitoID,Municipio,Localidad) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/BlogActualiza/'+Id+'/'+Titulo+'/'+Contenido+'/'+Tema+'/'+Subtema+'/'+Condicion+'/'+Ambito+'/'+AmbitoID+'/'+Municipio+'/'+Localidad);
  }
  getMunLoc(Ambito,Municipal, Localidad){
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/BlogDetallado/'+Ambito+'/'+Municipal+'/'+Localidad);
  }
  getBlogTop3(id,fecha) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/BlogTop3/'+id+'/'+fecha);
  }
  getAnexoSubir(id,usuario,tipo,ruta) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/AnexosBlogSubir/'+id+'/'+usuario+'/'+tipo+'/'+ruta);
  }
  getAnexosblog(id) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/BlogAnexosget/'+id);
  }
  getAnexosblogDelate(id) {
    return this.http.get('https://'+this.ip+'/index.php/app_TurismoAht/BlogAnexosdelete/'+id);
  }  
}
