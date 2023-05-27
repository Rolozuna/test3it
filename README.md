# test3it

App: Prueba técnica 3it

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta el siguiente comando para instalar las dependencias:

   ```
   yarn install
   ```

3. Cambia al directorio `ios` e instala las dependencias específicas de iOS ejecutando el siguiente comando:
   ```
    pod install
   ```
4. Una vez instalado las dependencias, ejecutar:

   ### iOs:

   ```
   yan run ios
   ```

   ### android:

   ```
    yan run android
   ```

   ## PD:

   - En el caso de tener inconvenientes con algunos modulos, se recomienda ejecutar en la terminal:

   ```
   Yarn clean && yarn pod:clear
   ```

## Configuración de permisos

En la sección de "Settings" dentro del menú drawer de la aplicación, se encuentran las opciones de configuración de permisos. Estas opciones te permiten controlar los permisos de la aplicación, como el acceso a la cámara, ubicación o notificaciones, etc.
