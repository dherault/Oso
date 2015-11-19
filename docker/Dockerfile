FROM ubuntu:14.04

WORKDIR /tmp

RUN apt-get update && apt-get install -y \
    build-essential python curl wget git supervisor \
    protobuf-compiler libprotobuf-dev libcurl4-openssl-dev \ 
    libboost-all-dev libncurses5-dev libjemalloc-dev m4

RUN rm -rf /var/lib/apt/lists/* \
&&  sed -i 's/^\(\[supervisord\]\)$/\1\nnodaemon=true/' /etc/supervisor/supervisord.conf \
&&  update-rc.d supervisor defaults

RUN wget https://nodejs.org/dist/v5.1.0/node-v5.1.0.tar.gz \
&&  tar -xvf node* \
&&  cd node*/ && ./configure && make && make install

RUN wget https://download.rethinkdb.com/dist/rethinkdb-2.2.1.tgz \
&&  tar xf rethinkdb-2.2.1.tgz \
&&  cd rethinkdb-2.2.1 && ./configure --allow-fetch && make && make install

WORKDIR /root

RUN mkdir oso cloud9

RUN git clone https://github.com/c9/core.git ./cloud9 \
&&  cd cloud9/ && scripts/install-sdk.sh \
&&  sed -i -e 's_127.0.0.1_0.0.0.0_g' configs/standalone.js

RUN apt-get clean  \
&&  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
&&  echo "alias n='npm start'" >> ~/.bashrc
&&  echo "alias deploy='npm run deploy'" >> ~/.bashrc

ADD ./config/* /etc/supervisor/conf.d/

EXPOSE 80 81 3000 8080 9090 29015 28015

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
