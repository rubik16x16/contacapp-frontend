<template>
  <v-dialog
    v-model="dialog"
    width="500">

    <v-card>
      <v-form v-model="valid" @submit.prevent="actualizar" ref="form">
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Editar contacto
        </v-card-title>

        <v-card-text v-if="contacto != null">
          <v-text-field
            v-model="nuevoContacto.nombre"
            :rules="reglas.nombre"
            :counter="10"
            label="Nombre"
            required
          ></v-text-field>
          <v-text-field
            v-model="nuevoContacto.email"
            :rules="reglas.email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="nuevoContacto.telefono"
            :rules="reglas.telefono"
            :counter="7"
            label="Telefono"
            required
          ></v-text-field>
          <v-textarea
            v-model="nuevoContacto.direccion"
            :rules="reglas.direccion"
            :counter="100"
            label="Direccion"
          ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            type="submit">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['show', 'contacto'],
  watch: {

    show(){

      this.dialog = true;
      this.nuevoContacto = _.clone(this.contacto, true);
    }
  },
  data: function(){
    return {

      valid: false,
      dialog: false,
      nuevoContacto: {
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
      },
      reglas: {
        nombre:[
          v => !!v || 'El nombre es requerido',
          v => v.length <= 10 || 'El nombre debe tener maximo 10 caracteres.',
        ],
        email: [
          v => !!v || 'El email es requerido',
          v => /.+@.+/.test(v) || 'E-mail debe ser valido',
        ],
        telefono: [
          v => !!v || 'El telefono es requerido',
          v => v.length <= 7 || 'El telefono debe tener maximo 7 caracteres.',
        ],
        direccion: [
          v => !!v || 'La direccion es requerida',
          v => v.length <= 100 || 'La direccion debe tener maximo 100 caracteres.',
        ]
      }
    }
  },
  methods: {

    actualizar(){
      if(this.valid){

        axios.put(`contactos/${this.nuevoContacto.id}`, this.nuevoContacto)
          .then(res => {

            console.log('res');
            this.$emit('actualizar', res.data);
            this.dialog = false;
            this.clear();
          })
          .catch(e => {

            console.log(e.response);
          });
      }else{

        this.validate();
      }
    },
    validate () {
      if(this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    clear(){
      this.$refs.form.resetValidation()
    },
  }
}
</script>

<style>

</style>