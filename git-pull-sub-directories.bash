#!/usr/bin/env bash

# GitHub Pages として公開しているリポジトリを取得・更新する
# 
# Neos21 リポジトリ以外、以下の記述と揃える
# - `.gitignore`
# - `index.html` : `const gitHubPagesRepositories`

declare -a repositories=(
  'google-translator'
  'in-browser-ts'
  'tab2tab'
  'neos-monaco-note'
  'detect-chinese'
  'practice-wasm-rust'
  'ddr'
  'neos-timer'
  'frontend-sandboxes'
  'practice-unity-first-2d-game'
  'auto-paste-url'
  'filmdex'
  'calc-resume-years'
  'practice-preact-on-github-pages'
  'practice-riot'
  'site-status'
  'practice-svelte'
  'list-repos'
  'practice-opencvjs'
  'birthdates'
  'nemui-gacha-js'
  'web-camera-light-sensor'
  'ios-memo-icon-generator'
  'poc-perfect-yu-gothic'
  'bookmarkletify'
  'legacy-of-html'
  'compare-colour-contrast-ratio'
  'garbler'
  'bookmarklets'
  'ngx-markdown-wiki'
  'bootstrap3-glyphicons'
  'neos-normalize'
  'ccc'
  'in-browser-sass'
  'angular-utilities'
  'poc-ios-safari-web'
  'hatena-blogs'
  'practice-bootstrap3'
)

index=0
for repository_name in ${repositories[@]}; do
  echo "[$index] ${repository_name}"
  git clone "https://Neos21@github.com/Neos21/${repository_name}.git"
  cd "./${repository_name}/"
  git pull
  cd '../'
  let index++
done
