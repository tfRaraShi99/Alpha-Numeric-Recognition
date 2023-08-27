from flask import Flask,render_template,request
my_app=Flask(__name__)

@my_app.route('/',methods=['GET','POST'])
def home_page():
	if request.method=='POST':
		Link=request.form.get('imagelink')
		print(Link)
	elif request.method=='GET':
		Link=""
	print(request.method)
	return render_template('front_end.html',link=Link)

@my_app.route('/page2')
def page2():
	return "<html>\
	<head>\
	<title>page2</title>\
	</head>\
	<p style=\"color:blue;text-align:center;font-size:60px;\">This is page 2</p>\
	</html>"

if __name__=='__main__':
	my_app.run(debug=True)