FROM ubuntu:14.04

WORKDIR /tmp

RUN apt-get update && apt-get install -y \
    build-essential python curl wget git supervisor

RUN wget https://nodejs.org/dist/v5.1.0/node-v5.1.0.tar.gz \
&&  tar -xvf node* \
&&  rm *.tar.gz \
&&  cd node*/ && ./configure && make && make install

RUN rm -rf /var/lib/apt/lists/* \
&&  sed -i 's/^\(\[supervisord\]\)$/\1\nnodaemon=true/' /etc/supervisor/supervisord.conf \
&&  update-rc.d supervisor defaults

WORKDIR /root

RUN mkdir oso cloud9

RUN git clone https://github.com/c9/core.git ./cloud9 \
&&  cd cloud9/ && scripts/install-sdk.sh \
&&  sed -i -e 's_127.0.0.1_0.0.0.0_g' configs/standalone.js

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN echo "alias n='npm start'" >> ~/.bashrc

ADD ./config/* /etc/supervisor/conf.d/

EXPOSE 80 81 3000 8080 9090 29015 28015

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]