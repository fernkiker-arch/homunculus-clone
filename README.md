# Clone Complet & Rétro-Ingénierie — homunculus Inc. (https://homunculus.jp/)

Clone local statique complet et analyse d'ingénierie inverse du site expérimental 3D WebGL de **株式会社ホムンクルス (homunculus Inc.)**, studio tokyoïte de design interactif et d'ingénierie numérique.

---

## 🔬 Rapport de Rétro-Ingénierie

### 1. Architecture 3D & Moteur WebGL
* **Moteur 3D** : Three.js avec GLTFLoader personnalisé.
* **Modèles 3D GLTF/GLB (`assets/models/`)** :
  * `face.glb` : Buste et visage humain haute résolution avec maillage de morphing.
  * `eye.glb` & `tooth.glb` : Yeux avec texture de pupille (`hitomi.png`, `eye_diffuse.jpg`) et mâchoire/dents réalistes.
  * `outline8.glb` : Réticule géométrique de tracking facial et squelette de bones interactif.
  * `crio.glb` : Effet de flux vectoriel de distorsion et déformation particulaire.
* **Pipeline de Shaders GLSL (39 modules dans `assets/shader/`)** :
  * `face_vtx.js` / `face_frg.js` : Shader d'éclairage et diffusion de peau avec masques d'ombres portées (`face_shadow.webp`).
  * `display_frg.js` / `s2display_frg.js` : Shaders de post-processing principal avec effets de glitch, bruit de balayage cathodique et aberration chromatique.
  * `blur_frg.js` / `blur2_frg.js` : Flou directionnel et de profondeur.
  * `voiceLine_vtx.js` / `voiceLine_frg.js` : Ondes audio animées en temps réel connectées à l'analyseur spectral WebAudio.
  * `s2Logoparticle_*.js` / `s2particle_*.js` : Systèmes de particules GPU pour la transition "Inside".

### 2. Moteur Audio & Sound Design
* **Bibliothèque** : Howler.js (`assets/lib/howler.min.js`) couplée à l'API WebAudio native (AnalyserNode).
* **Audio Sprite Voix (`assets/voice/voice16.mp3`)** :
  * Toutes les voix narratives japonaises sont encodées dans un seul fichier MP3 avec repères temporels (sprites `s0` à `s15` : "Feature", "Attitude", "Policy", sous-titres synchronisés).
* **Musiques d'ambiance (`assets/sound/`)** :
  * `bgm2.mp3` : Nappe sonore principale dark ambient.
  * `bgm_rev.mp3` : Piste inversée pour les transitions de scène.
  * `caution.mp3` : Bip d'avertissement et retour haptique sonore.

### 3. Données & Projets du Portfolio
* `works/works.json` : Base de données des 10 créations emblématiques du studio (*BRAVIS, BiSH iS OVER!, Citizen / Light is Time, Ricoh Data Visualizer, etc.*).
* `data/*.mp4` & `works/*.webp` : Vidéos MP4 et affiches WebP des études de cas intégrées localement.

---

## 📁 Structure du Répertoire

```
/root/cloned-homunculus/
├── index.html                  # Point d'entrée HTML
├── README.md                   # Documentation d'ingénierie inverse
├── common/                     # Métadonnées et image OpenGraph
├── data/                       # Vidéos de démonstration (1_video.mp4, 2_video.mp4, 3_video.mp4)
├── works/                      # Affiches WebP et works.json
└── assets/
    ├── js/
    │   └── main.js             # Moteur principal interactif
    ├── css/
    │   ├── destyle.css         # Reset CSS moderne
    │   └── gl.css              # Styles et animations de l'interface
    ├── lib/
    │   └── howler.min.js       # Moteur audio spatial Howler
    ├── models/                 # Modèles 3D GLB (face, eye, tooth, outline8, crio)
    ├── shader/                 # Les 39 shaders GLSL dédiés
    ├── image/                  # Textures de peau, masques, typographies
    ├── sound/                  # Pistes BGM et SFX
    └── voice/                  # Audio sprite des voix japonaises
```

---

## 🚀 Démarrage du serveur local

Pour lancer ou relancer le serveur de test :

```bash
python3 -m http.server 8083 --directory /root/cloned-homunculus
```

Ouvrez ensuite `http://localhost:8083/` dans votre navigateur.
Cliquez sur **"Enter with Sound"** pour démarrer l'expérience 3D.
