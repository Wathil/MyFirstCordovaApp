/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  document.getElementById('deviceready').classList.add('ready');
  document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
}

function cameraTakePicture() {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL
  });
  function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
  }
  function onFail(message) {
    alert('Failed because: ' + message);
  }
}

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
//   });

//   // Or with jQuery

$(document).ready(function () {
  $('.sidenav').sidenav();
});

var app = new function () {

  this.el = $("#countries")[0];
  this.countries = [];

  // Afficher le pays
  this.fetchAll = function () {
    var data = "";
    this.count(this.countries.length);
    if (this.countries.length > 0) {
      for (var i = 0; i < this.countries.length; i++) {
        data += "<tr>";
        data += "<td class=\"white-text\">" + this.countries[i] + "</td>";
        data += '<td><button onclick="app.edit(' + i + ')">Edit</button>';
        data += '&nbsp;<button onclick="app.delete(' + i + ')">Delete</button></td>';
        data += '</tr>';
      };
      return this.el.innerHTML = data;
    }
    else {
      return this.el.innerHTML = "Ins??rer un nouveau pays.";
    }
  }

  // Ajouter un pays au tableau countries
  this.add = function () {
    var el = document.getElementById("add-name");
    var country = el.value;
    if (country) {
      this.countries.push(country.trim());
      el.value = "";
      this.fetchAll();
    }
  }

  // Mise ?? jour d'un element
  this.edit = function (item) {
    var el = document.getElementById('edit-name');
    // Affiche l'element recupere selon l'indice recupere
    // en parametre
    el.value = this.countries[item];
    document.getElementById('spoiler').style.display = 'block';

    // self est utilis?? pour maintenir une r??f??rence ?? l'original 
    // m??me si le contexte change.
    self = this;

    document.getElementById('save-edit').onsubmit = function () {

      // recupere la valeur
      var country = el.value;

      if (country) {
        // Met ?? jour la valeur
        self.countries.splice(item, 1, country.trim());
        // affiche la nouvelle liste
        self.fetchAll();
        // Cache les champs de mise ?? jour
        closeInput();
      }
    }
  }

  // Supprimer un pays du tableau countries
  this.delete = function (item) {
    this.countries.splice(item, 1);
    this.fetchAll();
  }

  // Compte le nombre d'??l??ment du tableau
  this.count = function (data) {
    var el = document.getElementById("counter");
    var name = "country";
    if (data > 0) {
      el.innerHTML = data + " countries";
    }
    else {
      el.innerHTML = "No countries";
    }
  }
}

app.fetchAll();

function closeInput() {
  document.getElementById("spoiler").style.display = "none";
}

