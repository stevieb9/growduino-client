Frontend client for [Growduino-firmware](https://github.com/AxTheB/Growduino-firmware/)

### Implementation specifics
* FAT filesystem - filenames must be in 8.3 format.
* Parallel requests are not recommended.

### Instalace

Requirements - NodeJS, Grunt, Bower

1. checkout z repositare, klasika<br>
  `git clone git@github.com:farin/growduino-client.git`

2. sup do adresare<br>
  `cd growduino-client/`

3. nainstalovat NodeJS zavislosti (pro dev a pripadne pro proxy)<br>
  `npm install`

4. Bower pak stahne vsechny zavislosti samotne webove aplikace.<br>
  `bower install`

A tim je apliakce ready pro vyvoj:

1. Dev server na portu 8000 - serviruje src adresar a proxuje api cally na realne growduino - viz proxy.js<br>
  `node proxy`

2. Build pro arduino (verze pro rybare je distfish, zakladni verze dist - lisi se to jen v settings.js - viz Gruntfile)<br>Build je v adresari dist<br>
  `grunt distfish`

1. Nainstalovat GIT pomoci: `sudo apt-get install git` <br>
2. Naklonovat si repository pomoci: `git clone https://github.com/romanicak/growduino-client`<br>
3. Sup do adresare: `cd growduino-client`<br>
4. Nainstalovat NPM pomoci: `sudo apt-get install npm`<br>
5. Nainstalovat NodeJS zavislosti (pro dev a pripadne pro proxy): `npm install`<br>
6. Nainstalovat Bower pomoci: `sudo npm install -g bower`<br>
7. Dostat Node na spravnou cestu, on uz se totiz jmenuje NodeJS: `sudo ln -s /usr/bin/nodejs /usr/bin/node`<br>
8. Bower pak stahne vsechny zavislosti samotne webove aplikace: `bower install`<br>
9. Nainstalovat Grunt pomoci: `sudo npm install -g grunt-cli`<br>
-- Ted je vse pripraveno pro build, nasledujici je potreba pro editaci a testy--<br>
10. Spustit proxy pomoci: `node proxy`<br>
11. V prohlizeci by se ted pod adresou localhost:8000 mel zobrazit lokalni web co si taha data ze skutecnyho Growduina<br>
12. Stahnout editor, treba http://www.sublimetext.com/ (rozbalit a instalovat jde ve voknech) spustit z terminalu pomoci: `subl`<br>
13. Po editaci (staci tam pretahovat co chci editovat) se buildi pomoci: `grunt dist` (kde dist je parametr jakou distribuci buildit, pro rybare je to distfish)<br>

