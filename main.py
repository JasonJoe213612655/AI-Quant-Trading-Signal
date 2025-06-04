from flask import Flask, request, jsonify
from flask_cors import CORS
from workflow import create_workflow_graph, WorkflowState
import logging
from utils.logger import setup_logger

# Configure logging
logger = setup_logger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS support

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        # Get request data
        data = request.get_json()
        symbol = data.get('symbol')
        
        if not symbol:
            return jsonify({
                'status': 'error',
                'message': 'No asset code provided'
            }), 400
            
        # Create workflow graph instance
        workflow_graph = create_workflow_graph()
        
        # Initialize state
        initial_state = WorkflowState(
            messages=[],
            symbol=symbol,
            historical_data=None,
            technical_data=None,
            trading_strategy=None,
            backtest_results=None,
            backtest_evaluation={"is_satisfactory": False},
            sentiment_analysis=None,
            final_report="",
            live_signal=None
        )
        
        # Run workflow
        final_state = workflow_graph.invoke(initial_state)

        # Debug output: Print final_state content and type
        print('final_state:', final_state)
        for k, v in final_state.items():
            print(f"Field: {k}, Type: {type(v)}, Value: {v}")

        # Process return data, ensure serializable
        def safe(obj):
            if hasattr(obj, 'to_dict'):
                return obj.to_dict()
            elif hasattr(obj, 'to_json'):
                return obj.to_json()
            elif isinstance(obj, (list, dict, str, int, float, bool)) or obj is None:
                return obj
            else:
                return str(obj)

        return jsonify({
            'status': 'success',
            'data': {
                'backtest_results': safe(final_state.get('backtest_results')),
                'backtest_evaluation': safe(final_state.get('backtest_evaluation')),
                'live_signal': safe(final_state.get('live_signal')),
                'sentiment_analysis': safe(final_state.get('sentiment_analysis')),
                'final_report': safe(final_state.get('final_report'))
            }
        })
        
    except Exception as e:
        logger.error(f"Analysis request processing failed: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 