site:
	rm -fr /tmp/docs \
	  && cp -fr docs /tmp/docs \
	  && git checkout gh-pages \
  	&& cp -fr /tmp/docs/* ./docs \
		&& echo "done"


.PHONY: site
