from django.shortcuts import render

def land(request):
    return render(request, 'index.html')
def led(request):
    return render(request, 'leg.html')