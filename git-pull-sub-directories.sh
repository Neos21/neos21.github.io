#!/bin/bash

# GitHub Pages として公開しているリポジトリを取得・更新する
# 
# 以下の記述と揃える
# - `.gitignore`
# - `index.html` : `const gitHubPagesRepositories`

declare -a repositories=(
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
  'legacy-of-html'
  'compare-colour-contrast-ratio'
  'garbler'
  'Neos21'
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
