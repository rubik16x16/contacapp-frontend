<template>
  <v-dialog
    v-model="dialog"
    width="500">

    <v-card>
      <v-form v-model="valid" @submit.prevent="guardar" ref="form">
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Crear contacto
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="contacto.nombre"
            :rules="reglas.nombre"
            :counter="10"
            label="Nombre"
            required
          ></v-text-field>
          <v-text-field
            v-model="contacto.email"
            :rules="reglas.email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="contacto.telefono"
            :rules="reglas.telefono"
            :counter="7"
            label="Telefono"
            required
          ></v-text-field>
          <v-textarea
            v-model="contacto.direccion"
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
  props: ['show'],
  watch: {

    show(){

      this.dialog = true;
    }
  },
  data: function(){
    return {

      valid: false,
      dialog: false,
      contacto: {
        id: 10,
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

    guardar(){
      if(this.valid){

        this.dialog = false;
        this.$emit('guardar', this.contacto);
        this.clear();
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
      this.contacto = {
        nombre : '',
        email: '',
        telefono: '',
        direccion: ''
      }
    },
  }
}
</script>

<style>

</style>