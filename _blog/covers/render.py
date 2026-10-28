"""Gera as capas do blog a partir de covers.html.

Uso (na raiz do repositório):
    python3 -m http.server 8099 &
    python3 _blog/covers/render.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / 'src' / 'assets' / 'posts'
COVERS = {
    'c-preco': 'quanto-cobrar-por-sessao-de-terapia.png',
    'c-faltas': 'como-reduzir-faltas-na-clinica.png',
    'c-nfse': 'nota-fiscal-para-psicologos-e-terapeutas.png',
    'c-repasse': 'repasse-de-profissionais-na-clinica.png',
    'c-pront': 'prontuario-psicologico-o-que-o-cfp-exige.png',
    'c-gcal': 'google-agenda-na-clinica-de-terapia.png',
}

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1300, 'height': 800}, device_scale_factor=2)
    page.goto('http://127.0.0.1:8099/_blog/covers/covers.html', wait_until='networkidle')
    page.wait_for_timeout(500)
    for el_id, name in COVERS.items():
        page.locator(f'#{el_id}').screenshot(path=str(OUT / name))
        print('ok', name)
    browser.close()
