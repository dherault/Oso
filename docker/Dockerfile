FROM ubuntu:14.04
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /tmp

RUN apt-get update && apt-get install -y \
    build-essential python curl wget git supervisor

# Supervisor configuration
RUN rm -rf /var/lib/apt/lists/* \
&&  sed -i 's/^\(\[supervisord\]\)$/\1\nnodaemon=true/' /etc/supervisor/supervisord.conf \
&&  update-rc.d supervisor defaults

# Node v5 installation
RUN wget https://nodejs.org/dist/v5.1.0/node-v5.1.0.tar.gz \
&&  tar -xvf node* \
&&  cd node*/ && ./configure && make && make install

# RethinkDB installation
RUN source /etc/lsb-release  \
&&  echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | tee /etc/apt/sources.list.d/rethinkdb.list \
&&  wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | apt-key add - \
&&  apt-get update && apt-get install -y rethinkdb

WORKDIR /root

RUN mkdir oso cloud9

# Cloud9 installation
RUN git clone https://github.com/c9/core.git ./cloud9 \
&&  cd cloud9/ && scripts/install-sdk.sh \
&&  sed -i -e 's_127.0.0.1_0.0.0.0_g' configs/standalone.js

# Clean-up
RUN apt-get clean  \
&&  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
&&  echo "alias n='npm start'" >> ~/.bashrc \
&&  echo "alias deploy='npm run deploy'" >> ~/.bashrc

ADD ./config/* /etc/supervisor/conf.d/

EXPOSE 80 81 3000 8080 9090

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
