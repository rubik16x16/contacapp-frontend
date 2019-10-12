<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Email</th>
            <th class="text-left">Telefono</th>
            <th class="text-left">Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contacto, index) in contactos" :key="'contacto-' + index">
            <td>{{ contacto.nombre }}</td>
            <td>{{ contacto.email }}</td>
            <td>{{ contacto.telefono }}</td>
            <td>{{ contacto.direccion }}</td>
            <td>
              <v-icon @click="editar(contacto)">mdi-pencil</v-icon>
              <v-icon @click="eliminar(contacto)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div>
      <v-btn color="primary" @click="crear">crear</v-btn>
    </div>
    <crear :show="show.crear" @guardar="guardar"></crear>
    <editar :show="show.editar" :contacto="editarContacto" @actualizar="actualizar"></editar>
  </div>
</template>

<script>
export default {
  components: {

    crear: require('./crear').default,
    editar: require('./editar').default
  },
  data: function(){

    return {

      show: {
        crear: false,
        editar: false
      },
      editarContacto: null,
      contactos:[]
    }
  },
  mounted(){

    axios.get('contactos')
      .then(res => {

        this.contactos = res.data;
      })
      .catch(e => {

        console.log(e.response);
      });
  },
  methods: {

    crear(){

      this.show.crear = !this.show.crear;
    },
    guardar(contacto){

      this.contactos.push(contacto);
    },
    editar(contacto){

      this.editarContacto = contacto;
      this.show.editar = !this.show.editar;
    },
    actualizar(contacto){

      let oldIndex = this.contactos.indexOf(this.editarContacto);
      this.contactos.splice(oldIndex, 1, contacto);
    },
    eliminar(contacto){

      let index = this.contactos.indexOf(contacto);
      this.contactos.splice(index, 1);
      axios.delete(`contactos/${contacto.id}`)
        .then(res => {

          console.log('Contacto eliminado');
        })
        .catch(e => {

          console.log(e.response);
        });
    }
  }
}
</script>

<style>

</style>